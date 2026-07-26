import React from 'react';
import { Question, QuestionOptionKey } from '../types';
import MathText from './MathText';
import PhysicsFigure from './PhysicsFigure';
import { CheckCircle2, XCircle, HelpCircle, BookOpen, Sparkles, Award } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOption?: QuestionOptionKey;
  onSelectOption: (questionId: number, option: QuestionOptionKey) => void;
  isSubmitted: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}

const SECTION_COLORS: Record<string, { bg: string; text: string; border: string; tagBg: string }> = {
  'Sciences de la Vie': {
    bg: 'bg-emerald-950/30',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    tagBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  },
  Physique: {
    bg: 'bg-cyan-950/30',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    tagBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
  },
  Chimie: {
    bg: 'bg-purple-950/30',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    tagBg: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  },
  Mathématiques: {
    bg: 'bg-amber-950/30',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    tagBg: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
  },
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  onSelectOption,
  isSubmitted,
  onNext,
  onPrev,
}) => {
  const sectionStyle = SECTION_COLORS[question.section] || SECTION_COLORS['Sciences de la Vie'];
  const isCorrect = isSubmitted && selectedOption === question.correct_answer;
  const isWrong = isSubmitted && selectedOption && selectedOption !== question.correct_answer;
  const isUnanswered = isSubmitted && !selectedOption;

  const optionKeys: QuestionOptionKey[] = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl text-slate-100 transition-all">
      
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-mono font-bold border border-slate-700">
            Question {question.id} / {totalQuestions}
          </span>
          <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${sectionStyle.tagBg}`}>
            {question.section}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 text-cyan-300 text-xs font-bold border border-slate-700">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            {question.points} {question.points > 1 ? 'points' : 'point'}
          </span>

          {/* Submitted Badge */}
          {isSubmitted && (
            <span
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-extrabold uppercase border ${
                isCorrect
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                  : isWrong
                  ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {isCorrect && (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Correct (+{question.points} pts)</span>
                </>
              )}
              {isWrong && (
                <>
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Incorrect (0 pt)</span>
                </>
              )}
              {isUnanswered && (
                <>
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Non répondue (0 pt)</span>
                </>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Shared Context Box if available */}
      {question.context && (
        <div className="mb-5 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs leading-relaxed text-slate-300">
          <div className="flex items-center gap-2 font-bold text-cyan-400 mb-1.5 uppercase tracking-wider text-[11px]">
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>Énoncé / Contexte :</span>
          </div>
          <div className="text-slate-300 leading-normal">
            <MathText text={question.context} />
          </div>
        </div>
      )}

      {/* Physics Figures (Q15 to Q20) */}
      <PhysicsFigure questionId={question.id} />

      {/* Question Text */}
      <div className="mb-6">
        <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed tracking-tight">
          <MathText text={question.question} />
        </h2>
      </div>

      {/* Options List (A to E) */}
      <div className="space-y-3 mb-6">
        {optionKeys.map((key) => {
          const optionText = question.options[key];
          const isOptionSelected = selectedOption === key;
          const isThisCorrectAnswer = isSubmitted && key === question.correct_answer;
          const isThisSelectedWrong = isSubmitted && isOptionSelected && !isThisCorrectAnswer;

          let optionCardClass = 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 text-slate-200';
          let badgeClass = 'bg-slate-800 text-slate-400 border-slate-700';

          if (isOptionSelected && !isSubmitted) {
            optionCardClass = 'bg-cyan-950/60 border-cyan-500/80 text-white shadow-md shadow-cyan-500/10';
            badgeClass = 'bg-cyan-500 text-slate-950 font-black border-cyan-400';
          }

          if (isSubmitted) {
            if (isThisCorrectAnswer) {
              optionCardClass = 'bg-emerald-950/70 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500/50 shadow-md shadow-emerald-500/10';
              badgeClass = 'bg-emerald-500 text-slate-950 font-black border-emerald-400';
            } else if (isThisSelectedWrong) {
              optionCardClass = 'bg-rose-950/70 border-rose-500 text-rose-100 ring-1 ring-rose-500/50';
              badgeClass = 'bg-rose-500 text-white font-black border-rose-400';
            } else {
              optionCardClass = 'bg-slate-950/40 border-slate-800/60 opacity-60 text-slate-400';
            }
          }

          return (
            <div
              key={key}
              onClick={() => {
                if (!isSubmitted) {
                  onSelectOption(question.id, key);
                }
              }}
              className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all duration-200 ${optionCardClass} ${
                !isSubmitted ? 'cursor-pointer active:scale-[0.99]' : ''
              }`}
            >
              {/* Key Letter Badge (A, B, C, D, E) */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-extrabold border shrink-0 transition-colors ${badgeClass}`}
              >
                {key}
              </div>

              {/* Option Content */}
              <div className="flex-1 pt-0.5 text-sm sm:text-base leading-relaxed">
                <MathText text={optionText} />
              </div>

              {/* Post-Submit Status Badges */}
              {isSubmitted && isThisCorrectAnswer && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Bonne réponse</span>
                </div>
              )}

              {isSubmitted && isThisSelectedWrong && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold shrink-0">
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Votre choix</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons (Prev / Next) */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-slate-200 transition cursor-pointer"
        >
          ← Question précédente
        </button>

        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          {currentIndex + 1} / {totalQuestions}
        </span>

        <button
          onClick={onNext}
          disabled={currentIndex === totalQuestions - 1}
          className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-white transition shadow-md shadow-cyan-600/20 cursor-pointer"
        >
          Question suivante →
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
