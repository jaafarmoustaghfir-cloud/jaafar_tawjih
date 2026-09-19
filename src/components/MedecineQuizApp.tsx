import React, { useState, useEffect } from 'react';
import medecineExamRaw from '../data/medecine_2025_exam.json';
import ensaExamRaw from '../data/ensa_2024_exam.json';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {
  ExamDataset,
  Question,
  QuestionOptionKey,
  UserAnswers,
  QuizResult,
  SectionScoreSummary,
} from '../types';
import QuizHeader from './QuizHeader';
import QuestionCard from './QuestionCard';
import QuestionNavigation from './QuestionNavigation';
import QuizResultsSummary from './QuizResultsSummary';
import {
  BookOpen,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  Layers,
  GraduationCap,
  ArrowRight,
  ShieldAlert,
  UserCheck,
} from 'lucide-react';

const EXAMS: Record<'MEDECINE_2025' | 'ENSA_2024', ExamDataset> = {
  MEDECINE_2025: medecineExamRaw as ExamDataset,
  ENSA_2024: ensaExamRaw as unknown as ExamDataset,
};

export const MedecineQuizApp: React.FC = () => {
  const [selectedExamKey, setSelectedExamKey] = useState<'MEDECINE_2025' | 'ENSA_2024'>('ENSA_2024');

  const currentDataset = EXAMS[selectedExamKey];
  const questions = currentDataset.questions;
  const examInfo = currentDataset.exam_info;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [viewMode, setViewMode] = useState<'QUIZ' | 'SUMMARY'>('QUIZ');
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // User name tracking state for public visitors
  const [userName, setUserName] = useState<string>('');
  const [showNameModal, setShowNameModal] = useState<boolean>(false);
  const [tempNameInput, setTempNameInput] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('jaafar_tawjih_user_name');
    if (saved && saved.trim() !== '') {
      setUserName(saved.trim());
    }
  }, []);

  const handleStartExamClick = () => {
    const saved = localStorage.getItem('jaafar_tawjih_user_name');
    if (!saved || saved.trim() === '') {
      setShowNameModal(true);
    } else {
      setUserName(saved);
      setHasStarted(true);
    }
  };

  const handleConfirmName = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = tempNameInput.trim() || 'تلميذ زائر';
    localStorage.setItem('jaafar_tawjih_user_name', finalName);
    setUserName(finalName);
    setShowNameModal(false);
    setHasStarted(true);
  };

  const handleSwitchExam = (key: 'MEDECINE_2025' | 'ENSA_2024') => {
    setSelectedExamKey(key);
    setUserAnswers({});
    setIsSubmitted(false);
    setQuizResult(null);
    setCurrentIndex(0);
    setViewMode('QUIZ');
    setHasStarted(false);
  };

  // Total possible points
  const totalPointsPossible = questions.reduce((sum, q) => sum + q.points, 0);
  const answeredCount = Object.keys(userAnswers).length;

  const handleSelectOption = (questionId: number, option: QuestionOptionKey) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const calculateResults = (): QuizResult => {
    let obtainedPoints = 0;
    let correctCount = 0;
    let wrongCount = 0;

    const sectionSummaries: Record<string, SectionScoreSummary> = {};

    // Initialize section accumulators
    examInfo.sections.forEach((sec) => {
      sectionSummaries[sec.nom] = {
        nom: sec.nom,
        totalQuestions: 0,
        totalPoints: 0,
        obtainedPoints: 0,
        correctCount: 0,
      };
    });

    questions.forEach((q) => {
      const userPick = userAnswers[q.id];
      const secSummary = sectionSummaries[q.section];

      if (secSummary) {
        secSummary.totalQuestions += 1;
        secSummary.totalPoints += q.points;
      }

      if (userPick) {
        if (userPick === q.correct_answer) {
          obtainedPoints += q.points;
          correctCount += 1;
          if (secSummary) {
            secSummary.obtainedPoints += q.points;
            secSummary.correctCount += 1;
          }
        } else {
          wrongCount += 1;
        }
      }
    });

    const unansweredCount = questions.length - (correctCount + wrongCount);
    const percentage = Math.round((obtainedPoints / totalPointsPossible) * 100);

    return {
      totalPointsObtained: Math.round(obtainedPoints * 100) / 100,
      maxPointsPossible: totalPointsPossible,
      percentage,
      totalAnswered: Object.keys(userAnswers).length,
      correctAnswersCount: correctCount,
      wrongAnswersCount: wrongCount,
      unansweredCount,
      sectionSummaries,
    };
  };

  const handleSubmitExam = async () => {
    const res = calculateResults();
    setQuizResult(res);
    setIsSubmitted(true);
    setViewMode('SUMMARY');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Save session automatically to Firestore collection "sessions_qcm"
    try {
      const currentUserName = userName || localStorage.getItem('jaafar_tawjih_user_name') || 'تلميذ زائر';
      
      const sessionReponses = questions.map((q) => {
        const userChoice = userAnswers[q.id];
        const isCorrect = userChoice ? userChoice === q.correct_answer : false;
        return {
          question_id: q.id,
          reponse_donnee: userChoice || 'NON_REPONDU',
          correcte: isCorrect,
          points_obtenus: isCorrect ? q.points : 0,
        };
      });

      await addDoc(collection(db, 'sessions_qcm'), {
        nom_utilisateur: currentUserName,
        concours: selectedExamKey === 'ENSA_2024' ? 'ENSA' : 'Médecine',
        annee: selectedExamKey === 'ENSA_2024' ? '2024' : '2025',
        score_total: res.totalPointsObtained,
        reponses: sessionReponses,
        date: serverTimestamp(),
      });
      console.log('Session QCM enregistrée avec succès dans Firestore !');
    } catch (err) {
      console.error('Erreur enregistrement session Firestore:', err);
    }
  };

  const handleResetExam = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setQuizResult(null);
    setCurrentIndex(0);
    setViewMode('QUIZ');
    setHasStarted(false);
  };

  const currentQuestion = questions[currentIndex];

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid firing if user is typing in input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' && currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else if (!isSubmitted && ['a', 'b', 'c', 'd', 'e', 'A', 'B', 'C', 'D', 'E'].includes(e.key)) {
        const option = e.key.toUpperCase() as QuestionOptionKey;
        if (currentQuestion) {
          handleSelectOption(currentQuestion.id, option);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions.length, currentQuestion, isSubmitted]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 pb-16">
      
      {/* Sticky Top Quiz Header */}
      <QuizHeader
        examInfo={examInfo}
        totalQuestions={questions.length}
        answeredCount={answeredCount}
        totalPointsPossible={totalPointsPossible}
        isSubmitted={isSubmitted}
        onTimeExpired={handleSubmitExam}
        onSubmitExam={handleSubmitExam}
        onResetExam={handleResetExam}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Exam Selection Pills & Intro */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6">
          <button
            onClick={() => handleSwitchExam('ENSA_2024')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer ${
              selectedExamKey === 'ENSA_2024'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400 font-extrabold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Concours ENSA 2024</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/60 font-mono">
              40 QCM
            </span>
          </button>

          <button
            onClick={() => handleSwitchExam('MEDECINE_2025')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer ${
              selectedExamKey === 'MEDECINE_2025'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-400 font-extrabold'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Concours Médecine 2025</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/60 font-mono">
              56 QCM
            </span>
          </button>
        </div>

        {/* Intro Screen before starting exam if not started */}
        {!hasStarted && !isSubmitted && (
          <div className="max-w-3xl mx-auto my-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-slate-100 text-center animate-fadeIn">
            <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-xl shadow-cyan-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-cyan-400" />
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-bold uppercase tracking-wider inline-block mb-3">
              {examInfo.title} — Session {examInfo.annee_universitaire}
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              {examInfo.title}
            </h1>

            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
              Testez vos connaissances en conditions réelles d'examen avec l'épreuve officielle de {questions.length} questions réparties en {examInfo.sections.length} matières.
            </p>

            {/* Exam Specifications */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 text-left">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Nombre de QCM</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">{questions.length} Questions</div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Durée officielle</div>
                <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">{examInfo.duree}</div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Total des Points</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                  {totalPointsPossible} Points
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Matières</div>
                <div className="text-base font-bold text-amber-400 font-mono mt-0.5">{examInfo.sections.length} Sections</div>
              </div>
            </div>

            {/* Consignes Box */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-left mb-8 space-y-2 text-xs text-slate-300">
              <span className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                <ShieldAlert className="w-4 h-4 text-cyan-400" />
                Consignes de l'Épreuve :
              </span>
              <ul className="list-disc list-inside space-y-1 pl-1 text-slate-300">
                {examInfo.consignes.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
                <li>Navigation libre entre toutes les questions via le clavier ou la grille interactive.</li>
              </ul>
            </div>

            <button
              onClick={handleStartExamClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/20 transition active:scale-95 cursor-pointer flex items-center justify-center gap-2 mx-auto"
            >
              <span>Commencer le Test ({examInfo.title})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Modal for asking student name before first QCM */}
        {showNameModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 max-w-sm w-full rounded-3xl p-6 shadow-2xl space-y-4 text-right animate-fadeIn">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white">مرحباً بك في الاختبار</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  أدخل اسمك الكامل لتسجيل نتيجتك في لائحة المتفوقين (Classement). سيتم حفظ الاسم تلقائياً في جهازك.
                </p>
              </div>

              <form onSubmit={handleConfirmName} className="space-y-3">
                <input
                  type="text"
                  value={tempNameInput}
                  onChange={(e) => setTempNameInput(e.target.value)}
                  placeholder="مثال: يوسف العلمي"
                  autoFocus
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none text-right"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition cursor-pointer"
                >
                  بدء الاختبار الآن
                </button>
              </form>
            </div>
          </div>
        )}

        {/* View Mode Toggle when exam is completed */}
        {isSubmitted && (
          <div className="flex items-center justify-between mb-6 bg-slate-900 p-2 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('QUIZ')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  viewMode === 'QUIZ'
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Inspection Question par Question
              </button>
              <button
                onClick={() => setViewMode('SUMMARY')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  viewMode === 'SUMMARY'
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Récapitulatif & Score Global
              </button>
            </div>
          </div>
        )}

        {/* Main Quiz View */}
        {(hasStarted || isSubmitted) && viewMode === 'QUIZ' && (
          <div className="space-y-6">
            
            {/* Top Navigation Drawer */}
            <QuestionNavigation
              questions={questions}
              sections={examInfo.sections}
              currentIndex={currentIndex}
              userAnswers={userAnswers}
              isSubmitted={isSubmitted}
              onSelectQuestion={(idx) => setCurrentIndex(idx)}
            />

            {/* Active Question Card */}
            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                selectedOption={userAnswers[currentQuestion.id]}
                onSelectOption={handleSelectOption}
                isSubmitted={isSubmitted}
                onNext={() => {
                  if (currentIndex < questions.length - 1) {
                    setCurrentIndex((prev) => prev + 1);
                  }
                }}
                onPrev={() => {
                  if (currentIndex > 0) {
                    setCurrentIndex((prev) => prev - 1);
                  }
                }}
              />
            )}
          </div>
        )}

        {/* Results Summary View */}
        {isSubmitted && viewMode === 'SUMMARY' && quizResult && (
          <QuizResultsSummary
            questions={questions}
            sections={examInfo.sections}
            userAnswers={userAnswers}
            result={quizResult}
            onRestart={handleResetExam}
            onReviewQuestion={(idx) => {
              setCurrentIndex(idx);
              setViewMode('QUIZ');
            }}
          />
        )}
      </main>
    </div>
  );
};

export default MedecineQuizApp;
