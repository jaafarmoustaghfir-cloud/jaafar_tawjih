import React, { useState } from 'react';
import { Question, UserAnswers, QuizResult, ExamSectionInfo } from '../types';
import MathText from './MathText';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  BarChart3,
  Filter,
  Printer,
  ChevronRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface QuizResultsSummaryProps {
  questions: Question[];
  sections: ExamSectionInfo[];
  userAnswers: UserAnswers;
  result: QuizResult;
  onRestart: () => void;
  onReviewQuestion: (index: number) => void;
}

export const QuizResultsSummary: React.FC<QuizResultsSummaryProps> = ({
  questions,
  sections,
  userAnswers,
  result,
  onRestart,
  onReviewQuestion,
}) => {
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'CORRECT' | 'WRONG' | 'UNANSWERED'>('ALL');

  const filteredQuestions = questions.filter((q) => {
    const isAnswered = !!userAnswers[q.id];
    const isCorrect = userAnswers[q.id] === q.correct_answer;

    if (reviewFilter === 'CORRECT') return isCorrect;
    if (reviewFilter === 'WRONG') return isAnswered && !isCorrect;
    if (reviewFilter === 'UNANSWERED') return !isAnswered;
    return true;
  });

  const getAdmissibilityBadge = (pct: number) => {
    if (pct >= 75) {
      return {
        label: '🟢 EXCELLENT — FORTES CHANCES D\'ADMISSIBILITÉ',
        color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      };
    }
    if (pct >= 50) {
      return {
        label: '🟡 ADMISSIBLE — BON NIVEAU GÉNÉRAL',
        color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      };
    }
    return {
      label: '🔴 À CONSOLIDER — RÉVISER LES SECTIONS FAIBLES',
      color: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    };
  };

  const admissBadge = getAdmissibilityBadge(result.percentage);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Main Score Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
          
          {/* Main Score Gauge */}
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-xl shadow-cyan-500/20 flex flex-col items-center justify-center text-center shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center p-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 font-mono">
                  {result.percentage}%
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1">
                  Note finale
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl sm:text-2xl font-black text-white">Résultat du Concours</h2>
              </div>
              
              <div className="text-sm text-slate-300 font-medium mb-3">
                Score obtenu :{' '}
                <strong className="text-cyan-400 text-lg font-mono font-bold">
                  {result.totalPointsObtained}
                </strong>{' '}
                / {result.maxPointsPossible} points
              </div>

              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${admissBadge.color}`}>
                {admissBadge.label}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition cursor-pointer"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Imprimer / PDF</span>
            </button>

            <button
              onClick={onRestart}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Refaire le Concours</span>
            </button>
          </div>
        </div>

        {/* Global Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block mb-1">Réponses Correctes</span>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-emerald-400 font-mono">
                {result.correctAnswersCount} / {questions.length}
              </span>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block mb-1">Réponses Fausse(s)</span>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-rose-400 font-mono">
                {result.wrongAnswersCount}
              </span>
              <XCircle className="w-5 h-5 text-rose-400" />
            </div>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block mb-1">Questions Omises</span>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-slate-400 font-mono">
                {result.unansweredCount}
              </span>
              <HelpCircle className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block mb-1">Taux de Précision</span>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-cyan-400 font-mono">
                {result.totalAnswered > 0
                  ? Math.round((result.correctAnswersCount / result.totalAnswered) * 100)
                  : 0}%
              </span>
              <BarChart3 className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown per Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <span>Détail par Section (Matière)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sections.map((sec) => {
            const summary = result.sectionSummaries[sec.nom];
            if (!summary) return null;

            const secPercentage = summary.totalPoints > 0
              ? Math.round((summary.obtainedPoints / summary.totalPoints) * 100)
              : 0;

            return (
              <div
                key={sec.nom}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      {sec.nom}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      Q{sec.de}–Q{sec.a}
                    </span>
                  </div>

                  <div className="text-2xl font-black text-white font-mono mb-1">
                    {summary.obtainedPoints}{' '}
                    <span className="text-xs font-normal text-slate-400 font-sans">
                      / {summary.totalPoints} pts
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 mb-3">
                    {summary.correctCount} bonne(s) réponse(s) sur {summary.totalQuestions} questions
                  </div>
                </div>

                <div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        secPercentage >= 70
                          ? 'bg-emerald-500'
                          : secPercentage >= 40
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${secPercentage}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono font-semibold">
                    Réussite : {secPercentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Question Correction Review */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <span>Correction Détaillée des 56 Questions</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Revoyez chaque question avec la bonne réponse surlignée et vos points attribués.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setReviewFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                reviewFilter === 'ALL'
                  ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Toutes ({questions.length})
            </button>
            <button
              onClick={() => setReviewFilter('CORRECT')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                reviewFilter === 'CORRECT'
                  ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md'
                  : 'bg-slate-800 text-emerald-400 hover:bg-slate-700'
              }`}
            >
              Correctes ({result.correctAnswersCount})
            </button>
            <button
              onClick={() => setReviewFilter('WRONG')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                reviewFilter === 'WRONG'
                  ? 'bg-rose-500 text-white font-extrabold shadow-md'
                  : 'bg-slate-800 text-rose-400 hover:bg-slate-700'
              }`}
            >
              Incorrectes ({result.wrongAnswersCount})
            </button>
            <button
              onClick={() => setReviewFilter('UNANSWERED')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                reviewFilter === 'UNANSWERED'
                  ? 'bg-slate-600 text-white font-extrabold shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              Omises ({result.unansweredCount})
            </button>
          </div>
        </div>

        {/* Questions Correction List */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const qIndex = questions.findIndex((item) => item.id === q.id);
            const userPick = userAnswers[q.id];
            const isCorrect = userPick === q.correct_answer;
            const isAnswered = !!userPick;

            return (
              <div
                key={q.id}
                className={`p-4 sm:p-5 rounded-2xl border transition ${
                  isCorrect
                    ? 'bg-slate-950/80 border-emerald-500/30'
                    : isAnswered
                    ? 'bg-slate-950/80 border-rose-500/30'
                    : 'bg-slate-950/50 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-mono font-bold">
                      Q{q.id}
                    </span>
                    <span className="text-xs font-bold text-cyan-400">{q.section}</span>
                    <span className="text-xs text-slate-500 font-mono">• {q.points} pt(s)</span>
                  </div>

                  <button
                    onClick={() => onReviewQuestion(qIndex)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspecter</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-sm font-semibold text-white mb-3">
                  <MathText text={q.question} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {/* Correct Answer Box */}
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-400 block text-[11px] uppercase">
                        Bonne réponse : Proposition {q.correct_answer}
                      </span>
                      <MathText text={q.options[q.correct_answer]} />
                    </div>
                  </div>

                  {/* User Choice Box */}
                  <div
                    className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                      isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300'
                        : isAnswered
                        ? 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : isAnswered ? (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    ) : (
                      <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    )}

                    <div>
                      <span className="font-bold block text-[11px] uppercase">
                        {isAnswered
                          ? `Votre choix : Proposition ${userPick}`
                          : 'Aucune réponse sélectionnée'}
                      </span>
                      {userPick && <MathText text={q.options[userPick]} />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizResultsSummary;
