import React, { useEffect, useState } from 'react';
import { Timer, Play, Pause, RotateCcw, CheckCircle2, Award, Clock, FileText, AlertTriangle } from 'lucide-react';
import { ExamInfo } from '../types';

interface QuizHeaderProps {
  examInfo: ExamInfo;
  totalQuestions: number;
  answeredCount: number;
  totalPointsPossible: number;
  isSubmitted: boolean;
  onTimeExpired: () => void;
  onSubmitExam: () => void;
  onResetExam: () => void;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  examInfo,
  totalQuestions,
  answeredCount,
  totalPointsPossible,
  isSubmitted,
  onTimeExpired,
  onSubmitExam,
  onResetExam,
}) => {
  // 2 hours in seconds = 7200 seconds
  const INITIAL_TIME = 2 * 60 * 60; // 7200 seconds
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  // Timer countdown effect
  useEffect(() => {
    if (isSubmitted || !isTimerActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted, isTimerActive, onTimeExpired]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);
  const isTimeCritical = timeLeft < 10 * 60 && !isSubmitted; // less than 10 mins

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Exam Title & Meta */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 shrink-0 mt-0.5">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Concours Médecine 2025–2026
                </span>
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  • {examInfo.date} • {examInfo.version}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight leading-tight">
                {examInfo.title}
              </h1>
            </div>
          </div>

          {/* Right Column: Timer & Controls */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
            
            {/* 2-Hour Timer Badge */}
            {!isSubmitted && (
              <div
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-mono font-bold transition-all shadow-sm ${
                  isTimeCritical
                    ? 'bg-rose-950/80 border-rose-500/50 text-rose-300 animate-pulse'
                    : 'bg-slate-800/80 border-slate-700 text-cyan-300'
                }`}
              >
                <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-rose-400' : 'text-cyan-400'}`} />
                <span>{formatTime(timeLeft)}</span>

                <button
                  onClick={() => setIsTimerActive(!isTimerActive)}
                  title={isTimerActive ? 'Pause Chrono' : 'Reprendre Chrono'}
                  className="ml-1 p-1 hover:bg-slate-700 rounded transition text-slate-300 hover:text-white"
                >
                  {isTimerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}

            {/* Answer Progress Pill */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>
                <strong className="text-white font-bold">{answeredCount}</strong> / {totalQuestions} répondues
              </span>
              <span className="text-slate-500">({progressPercent}%)</span>
            </div>

            {/* Actions */}
            {!isSubmitted ? (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Valider l'épreuve</span>
              </button>
            ) : (
              <button
                onClick={onResetExam}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition duration-150 active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span>Recommencer le test</span>
              </button>
            )}
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Confirmation Modal Before Submission */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl text-slate-100">
            <div className="flex items-center gap-3 text-amber-400 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold">Confirmer la validation ?</h3>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              Vous avez répondu à <strong className="text-white font-bold">{answeredCount}</strong> questions sur{' '}
              <strong className="text-white font-bold">{totalQuestions}</strong>.
              {answeredCount < totalQuestions && (
                <span className="block mt-2 text-amber-300 text-xs font-semibold bg-amber-950/60 p-2.5 rounded-lg border border-amber-800/60">
                  ⚠️ Attention : {totalQuestions - answeredCount} questions restent sans réponse !
                </span>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
              >
                Poursuivre le test
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  onSubmitExam();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition"
              >
                Valider et calculer mon score
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default QuizHeader;
