import React, { useState } from 'react';
import { GUIDES_ORIENTATION, GuideOrientationData } from '../data/guides_orientation';
import {
  BookOpen,
  Clock,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Share2,
  Building2,
} from 'lucide-react';
import AdSenseUnit from './AdSenseUnit';

interface GuidesViewProps {
  onNavigateSchools?: () => void;
  onStartQuiz?: (quizKey: any) => void;
}

export const GuidesView: React.FC<GuidesViewProps> = ({ onNavigateSchools, onStartQuiz }) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(GUIDES_ORIENTATION[0].id);

  const currentGuide = GUIDES_ORIENTATION.find((g) => g.id === selectedGuideId) || GUIDES_ORIENTATION[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
          <BookOpen className="h-4 w-4" />
          <span>Guides &amp; Dossiers d’Orientation Stratégique</span>
        </div>

        <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3.5xl">
          Guides Pratiques pour Bacheliers au Maroc
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Analyses comparatives objectives, méthodologies de concours et conseils d’experts pour sécuriser
          vos choix post-bac sans céder aux idées reçues.
        </p>

        {/* Guides Selector Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          {GUIDES_ORIENTATION.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGuideId(g.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer text-left ${
                selectedGuideId === g.id
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold shadow-md ring-2 ring-amber-300'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {g.title.split(' : ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Guide Article View */}
      <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-8">
        {/* Article Meta Header */}
        <div className="border-b border-slate-100 pb-6 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-blue-100 px-3 py-1 font-bold text-blue-900 font-mono text-[11px]">
              {currentGuide.category}
            </span>
            <span className="text-slate-400">•</span>
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>{currentGuide.readingTime}</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
            {currentGuide.title}
          </h2>

          <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
            {currentGuide.subtitle}
          </p>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-700 leading-relaxed">
            <strong>Résumé synthétique :</strong> {currentGuide.summary}
          </div>
        </div>

        {/* Compliant AdSense Unit Inside High-Value Guide */}
        <AdSenseUnit slot="guide_top_banner" label={true} />

        {/* Article Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {currentGuide.sections.map((sec, idx) => (
            <section key={idx} className="space-y-3">
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-900 text-white font-mono text-xs font-bold">
                  {idx + 1}
                </span>
                <span>{sec.heading}</span>
              </h3>

              <div className="space-y-2.5 pl-8 text-slate-600">
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">{p}</p>
                ))}
              </div>

              {sec.keyTakeaway && (
                <div className="ml-8 rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs text-amber-950 flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">À retenir :</span>
                    <span>{sec.keyTakeaway}</span>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Compliant In-Article Bottom AdSense */}
        <AdSenseUnit slot="guide_bottom_banner" label={true} />

        {/* Related Schools Tags */}
        <div className="border-t border-slate-100 pt-6 space-y-3">
          <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-blue-700" />
            Établissements concernés par ce guide :
          </span>

          <div className="flex flex-wrap gap-2">
            {currentGuide.relatedSchools.map((s, idx) => (
              <span key={idx} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Guide Specific FAQ */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-3">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-amber-600" />
            Point FAQ spécifique
          </h4>

          {currentGuide.faq.map((item, idx) => (
            <div key={idx} className="space-y-1 text-xs">
              <p className="font-bold text-slate-900">{item.question}</p>
              <p className="text-slate-600 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default GuidesView;
