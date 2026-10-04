import React, { useState } from 'react';
import { CONCOURS_DETAILS, ConcoursDetailData } from '../data/concours_detail';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  HelpCircle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import AdSenseUnit from './AdSenseUnit';

interface ConcoursViewProps {
  onStartQuiz: (quizKey: 'ENSA_2024' | 'MEDECINE_2025' | 'MEDECINE_2022' | 'FMP_RABAT_2018') => void;
}

export const ConcoursView: React.FC<ConcoursViewProps> = ({ onStartQuiz }) => {
  const [selectedConcoursId, setSelectedConcoursId] = useState<string>(CONCOURS_DETAILS[0].id);

  const currentConcours = CONCOURS_DETAILS.find((c) => c.id === selectedConcoursId) || CONCOURS_DETAILS[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner Card */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
          <Award className="h-4 w-4" />
          <span>Guide Officieux des Concours Post-Bac au Maroc</span>
        </div>

        <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3.5xl">
          Concours d’Accès aux Grandes Écoles &amp; Facultés
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Toutes les informations vérifiées sur les épreuves écrites, les barèmes de notation, les étapes de sélection
          et les annales corrigées pour aborder vos concours dans des conditions optimales.
        </p>

        {/* Quick Tabs to Switch Concours */}
        <div className="mt-6 flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          {CONCOURS_DETAILS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedConcoursId(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedConcoursId === c.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold ring-2 ring-cyan-300'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {c.title.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Concours Detail Body */}
      <div className="space-y-6">
        {/* Title & Practice CTA Bar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Dossier Complet de Préparation
            </span>
            <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
              {currentConcours.title}
            </h2>
            <p className="text-xs text-slate-500">
              {currentConcours.schools}
            </p>
          </div>

          {currentConcours.practiceQuizKey && (
            <button
              onClick={() => onStartQuiz(currentConcours.practiceQuizKey!)}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-xs font-bold text-white shadow-md transition hover:opacity-95 cursor-pointer shrink-0"
            >
              <Sparkles className="h-4 w-4" />
              <span>S’entraîner en QCM Chronométré</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Conditions & Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Conditions de Candidature
            </h3>
            <p className="text-slate-600 leading-relaxed">{currentConcours.conditions}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              Procédure d’Inscription
            </h3>
            <p className="text-slate-600 leading-relaxed">{currentConcours.procedure}</p>
          </div>
        </div>

        {/* Exam Format & Structure */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-600" />
            Structure Détaillée des Épreuves Écrites (QCM)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {currentConcours.examFormat.map((fmt, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{fmt.subject}</span>
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 font-mono text-[10px] font-bold text-blue-900">
                    {fmt.duration}
                  </span>
                </div>
                <p className="text-slate-500 font-medium">{fmt.questionsCount}</p>
                <p className="text-slate-600 pt-1 text-[11px] border-t border-slate-200/80 leading-normal">
                  <strong>Barème / Thèmes :</strong> {fmt.grading}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliant In-Article AdSense Unit */}
        <AdSenseUnit slot="concours_middle_article" label={true} />

        {/* Calendar Steps & Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-600" />
              Calendrier Indicatif des Étapes de Sélection
            </h3>

            <div className="space-y-3">
              {currentConcours.calendarSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-mono font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 block">{step.step}</span>
                    <span className="text-slate-600 leading-relaxed">{step.description}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-[11px] text-amber-900 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0" />
              <span>Dates indicatives. Seules les circulaires officielles annuelles du Ministère fixent les dates fermes.</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-600" />
              Documents Requis
            </h3>

            <ul className="space-y-2 text-xs text-slate-600">
              {currentConcours.documents.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Preparation Tips & Strategy */}
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Lightbulb className="h-4 w-4" />
            <span>Conseils Stratégiques de Réussite</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white">
            Comment maximiser votre score le jour de l’épreuve ?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {currentConcours.preparationTips.map((tip, idx) => (
              <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-1">
                <span className="text-amber-300 font-bold block">Règle d’or #{idx + 1}</span>
                <p className="text-slate-300 leading-relaxed text-[11.5px]">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ & Official Source */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            Questions Fréquentes sur ce Concours
          </h3>

          <div className="space-y-3">
            {currentConcours.faq.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1 text-xs">
                <p className="font-bold text-slate-900 text-sm">{item.question}</p>
                <p className="text-slate-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 font-medium">Source officielle vérifiable :</span>
            <a
              href={currentConcours.officialSource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-bold underline cursor-pointer"
            >
              <span>{currentConcours.officialSource.label}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcoursView;
