import React, { useState } from 'react';
import { FILIERES_DETAILS, FiliereDetailData } from '../data/filieres_detail';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Briefcase,
  HelpCircle,
  Building2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import AdSenseUnit from './AdSenseUnit';

interface FilieresViewProps {
  onSelectSchool?: (schoolId: string) => void;
  onNavigateTab?: (tab: any) => void;
}

export const FilieresView: React.FC<FilieresViewProps> = ({ onSelectSchool, onNavigateTab }) => {
  const [selectedFiliereId, setSelectedFiliereId] = useState<string>(FILIERES_DETAILS[0].id);

  const currentFiliere = FILIERES_DETAILS.find((f) => f.id === selectedFiliereId) || FILIERES_DETAILS[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
          <BookOpen className="h-4 w-4" />
          <span>Guide des Métiers &amp; Spécialités d’Études</span>
        </div>

        <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3.5xl">
          Filières &amp; Domaines d’Avenir au Maroc
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Explorez en détail les cursus les plus demandés : programmes, compétences techniques acquises,
          profils recommandés, débouchés concrets et établissements de formation.
        </p>

        {/* Filières Quick Selector */}
        <div className="mt-6 flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          {FILIERES_DETAILS.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFiliereId(f.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedFiliereId === f.id
                  ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold ring-2 ring-amber-200'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {f.title.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Filiere Detail Card */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-[11px] font-bold text-blue-900 font-mono">
              {currentFiliere.category}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {currentFiliere.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {currentFiliere.presentation}
          </p>
        </div>

        {/* Profile & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-600" />
              Pour quel profil cette filière est-elle adaptée ?
            </h3>
            <p className="text-slate-600 leading-relaxed">{currentFiliere.requiredProfile}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              Durée des Études &amp; Diplômes
            </h3>
            <p className="text-slate-600 leading-relaxed">{currentFiliere.durationAndDiplomas}</p>
          </div>
        </div>

        {/* Core Subjects */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-600" />
            Matières Principales &amp; Modules Fondamentaux
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {currentFiliere.coreSubjects.map((subject, idx) => (
              <div key={idx} className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                <span className="font-medium text-slate-800">{subject}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliant In-Content AdSense Unit */}
        <AdSenseUnit slot="filieres_middle_content" label={true} />

        {/* Acquired Skills & Career Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-emerald-600" />
              Compétences Clés Acquises
            </h3>

            <ul className="space-y-2 text-slate-600">
              {currentFiliere.acquiredSkills.map((skill, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    ✓
                  </span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Débouchés &amp; Métiers au Maroc
            </h3>

            <ul className="space-y-2 text-slate-600">
              {currentFiliere.careerOutcomes.map((career, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">
                    ➔
                  </span>
                  <span className="font-medium text-slate-800">{career}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Moroccan Schools Offering this Filiere */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Building2 className="h-4 w-4 text-slate-700" />
            Établissements Proposant cette Filière au Maroc
          </h3>

          <div className="flex flex-wrap gap-2">
            {currentFiliere.moroccanSchools.map((s, idx) => (
              <span key={idx} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-800 shadow-2xs">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-amber-600" />
            Questions Fréquentes sur cette Filière
          </h3>

          <div className="space-y-3">
            {currentFiliere.faq.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1 text-xs">
                <p className="font-bold text-slate-900 text-sm">{item.question}</p>
                <p className="text-slate-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilieresView;
