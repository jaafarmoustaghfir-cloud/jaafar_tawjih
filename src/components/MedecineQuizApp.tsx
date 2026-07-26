import React, { useState, useEffect } from 'react';
import examDataRaw from '../data/medecine_2025_exam.json';
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
} from 'lucide-react';

const examData = examDataRaw as ExamDataset;

export const MedecineQuizApp: React.FC = () => {
  const [questions] = useState<Question[]>(examData.questions);
  const [examInfo] = useState(examData.exam_info);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [viewMode, setViewMode] = useState<'QUIZ' | 'SUMMARY'>('QUIZ');
  const [hasStarted, setHasStarted] = useState<boolean>(false);

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

  const handleSubmitExam = () => {
    const res = calculateResults();
    setQuizResult(res);
    setIsSubmitted(true);
    setViewMode('SUMMARY');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        
        {/* Intro Screen before starting exam if not started */}
        {!hasStarted && !isSubmitted && (
          <div className="max-w-3xl mx-auto my-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-slate-100 text-center animate-fadeIn">
            <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-xl shadow-cyan-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-cyan-400" />
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-bold uppercase tracking-wider inline-block mb-3">
              Concours de Médecine {examInfo.annee_universitaire}
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              {examInfo.title}
            </h1>

            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
              Testez vos connaissances en conditions réelles avec l'épreuve officielle de 56 QCM réparties en 4 matières.
            </p>

            {/* Exam Specifications */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 text-left">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Nombre de QCM</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">56 Questions</div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Durée officielle</div>
                <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">2 Heures</div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Total des Points</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                  {totalPointsPossible} Points
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">Pondération</div>
                <div className="text-base font-bold text-amber-400 font-mono mt-0.5">1 pt à 3 pts / Q</div>
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
              onClick={() => setHasStarted(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/20 transition active:scale-95 cursor-pointer flex items-center justify-center gap-2 mx-auto"
            >
              <span>Commencer le Test Maintenant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
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
