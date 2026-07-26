import React, { useState } from 'react';
import { Question, UserAnswers, ExamSectionInfo } from '../types';
import { LayoutGrid, Filter, Check, X, Circle, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface QuestionNavigationProps {
  questions: Question[];
  sections: ExamSectionInfo[];
  currentIndex: number;
  userAnswers: UserAnswers;
  isSubmitted: boolean;
  onSelectQuestion: (index: number) => void;
}

export const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  questions,
  sections,
  currentIndex,
  userAnswers,
  isSubmitted,
  onSelectQuestion,
}) => {
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('Tous');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const filteredQuestions = questions.filter((q) => {
    if (selectedSectionFilter === 'Tous') return true;
    return q.section === selectedSectionFilter;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl text-slate-100">
      
      {/* Drawer Header */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">Grille des 56 Questions</h3>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
        >
          <span>{isExpanded ? 'Réduire' : 'Afficher'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isExpanded && (
        <>
          {/* Section Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <button
              onClick={() => setSelectedSectionFilter('Tous')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                selectedSectionFilter === 'Tous'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Toutes (56)
            </button>

            {sections.map((sec) => {
              const isSelected = selectedSectionFilter === sec.nom;
              const sectionQuestions = questions.filter((q) => q.section === sec.nom);
              const answeredSecCount = sectionQuestions.filter((q) => userAnswers[q.id]).length;

              return (
                <button
                  key={sec.nom}
                  onClick={() => setSelectedSectionFilter(sec.nom)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>{sec.nom}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/20">
                    {answeredSecCount}/{sectionQuestions.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Question Grid Buttons */}
          <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-14 gap-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
            {filteredQuestions.map((q) => {
              const qIndex = questions.findIndex((item) => item.id === q.id);
              const isCurrent = qIndex === currentIndex;
              const hasAnswered = !!userAnswers[q.id];
              const isCorrect = isSubmitted && userAnswers[q.id] === q.correct_answer;
              const isWrong = isSubmitted && hasAnswered && !isCorrect;

              let btnClass = 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700';

              if (!isSubmitted) {
                if (hasAnswered) {
                  btnClass = 'bg-gradient-to-b from-cyan-600 to-blue-700 border-cyan-400 text-white font-black shadow-sm';
                }
              } else {
                if (isCorrect) {
                  btnClass = 'bg-emerald-600 border-emerald-400 text-white font-black';
                } else if (isWrong) {
                  btnClass = 'bg-rose-600 border-rose-400 text-white font-black';
                } else {
                  btnClass = 'bg-slate-800 border-slate-700 text-slate-500';
                }
              }

              if (isCurrent) {
                btnClass += ' ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900 scale-105 z-10';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => onSelectQuestion(qIndex)}
                  title={`Question ${q.id} (${q.section}) - ${q.points} pt${q.points > 1 ? 's' : ''}`}
                  className={`h-9 rounded-xl border text-xs font-mono font-bold flex items-center justify-center transition active:scale-95 cursor-pointer relative ${btnClass}`}
                >
                  <span>Q{q.id}</span>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 mt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            {!isSubmitted ? (
              <>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-cyan-600 border border-cyan-400" />
                  <span>Répondue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-slate-950 border border-slate-800" />
                  <span>Non répondue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-slate-950 border border-slate-800 ring-2 ring-amber-400" />
                  <span>Question active</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-emerald-600 border border-emerald-400" />
                  <span>Correcte</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-rose-600 border border-rose-400" />
                  <span>Incorrecte</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-slate-800 border border-slate-700" />
                  <span>Omise</span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionNavigation;
