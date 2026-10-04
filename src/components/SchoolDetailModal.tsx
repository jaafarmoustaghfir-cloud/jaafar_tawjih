import React, { useState } from 'react';
import { SCHOOLS_DETAILS, SchoolDetailData } from '../data/schools_detail';
import {
  X,
  Building2,
  MapPin,
  Clock,
  Award,
  ExternalLink,
  CheckCircle2,
  FileText,
  HelpCircle,
  AlertTriangle,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import AdSenseUnit from './AdSenseUnit';

interface SchoolDetailModalProps {
  schoolId: string | null;
  onClose: () => void;
  onPracticeQuiz?: (quizKey: 'ENSA_2024' | 'MEDECINE_2025' | 'MEDECINE_2022' | 'FMP_RABAT_2018') => void;
}

export const SchoolDetailModal: React.FC<SchoolDetailModalProps> = ({
  schoolId,
  onClose,
  onPracticeQuiz,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'OVERVIEW' | 'ACCESS' | 'FILIERES' | 'CAREERS' | 'FAQ'>('OVERVIEW');

  if (!schoolId) return null;

  // Find detailed data or provide clean fallback
  const detail: SchoolDetailData | undefined = SCHOOLS_DETAILS[schoolId.toLowerCase()];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 sm:p-4 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div
        className="relative my-6 w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-700 bg-white text-slate-800 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 rounded-full bg-white/10 p-2 text-white/80 transition hover:bg-white/20 hover:text-white cursor-pointer"
            aria-label="Fermer la fiche"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-bold text-amber-300">
            <Building2 className="h-3.5 w-3.5" />
            <span>Fiche Institutionnelle Officieuse &amp; Guide d’Accès</span>
          </div>

          <h2 className="mt-2 text-xl font-black sm:text-2xl text-white">
            {detail ? detail.name : `Dossier d’Orientation — ${schoolId.toUpperCase()}`}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" />
              <span>{detail ? detail.cities.join(', ') : 'Plusieurs villes au Maroc'}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              <span>{detail ? detail.duration : '2 à 5 ans selon cursus'}</span>
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 overflow-x-auto text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveSubTab('OVERVIEW')}
            className={`px-4 py-3 border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeSubTab === 'OVERVIEW'
                ? 'border-blue-700 text-blue-900 font-extrabold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Présentation &amp; Diplôme
          </button>
          <button
            onClick={() => setActiveSubTab('ACCESS')}
            className={`px-4 py-3 border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeSubTab === 'ACCESS'
                ? 'border-blue-700 text-blue-900 font-extrabold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Conditions d’Accès &amp; Concours
          </button>
          <button
            onClick={() => setActiveSubTab('FILIERES')}
            className={`px-4 py-3 border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeSubTab === 'FILIERES'
                ? 'border-blue-700 text-blue-900 font-extrabold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Filières &amp; Spécialités
          </button>
          <button
            onClick={() => setActiveSubTab('CAREERS')}
            className={`px-4 py-3 border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeSubTab === 'CAREERS'
                ? 'border-blue-700 text-blue-900 font-extrabold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Débouchés &amp; Métiers
          </button>
          <button
            onClick={() => setActiveSubTab('FAQ')}
            className={`px-4 py-3 border-b-2 transition cursor-pointer whitespace-nowrap ${
              activeSubTab === 'FAQ'
                ? 'border-blue-700 text-blue-900 font-extrabold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            FAQ
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="max-h-[65vh] overflow-y-auto p-6 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {detail ? (
            <>
              {activeSubTab === 'OVERVIEW' && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-700" />
                      Présentation de l’Établissement
                    </h3>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                      {detail.presentation}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Type d’Établissement</span>
                      <p className="font-bold text-slate-900">{detail.institutionType}</p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Diplôme Délivré</span>
                      <p className="font-bold text-slate-900">{detail.diploma}</p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Niveau d’Accès</span>
                      <p className="font-bold text-slate-900">{detail.accessLevel}</p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Durée des Études</span>
                      <p className="font-bold text-slate-900">{detail.duration}</p>
                    </div>
                  </div>

                  {/* Contextual Practice CTA */}
                  {(detail.id === 'ensa' || detail.id === 'fmp') && onPracticeQuiz && (
                    <div className="rounded-2xl border border-cyan-200 bg-cyan-50/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="font-bold text-cyan-900 flex items-center gap-1.5">
                          <Sparkles className="h-4 w-4 text-cyan-600" />
                          Entraînez-vous avec les vraies épreuves
                        </span>
                        <p className="text-xs text-cyan-800 mt-0.5">
                          Accédez aux QCM officiels corrigés de {detail.id.toUpperCase()} avec chronomètre et formules complètes.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onPracticeQuiz(detail.id === 'ensa' ? 'ENSA_2024' : 'MEDECINE_2025');
                        }}
                        className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-sm cursor-pointer whitespace-nowrap"
                      >
                        Lancer le QCM {detail.id === 'ensa' ? 'ENSA 2024' : 'Médecine 2025'}
                      </button>
                    </div>
                  )}

                  {/* Compliant Ad Unit Inside Full Content Page */}
                  <AdSenseUnit slot="school_modal_overview" label={true} />
                </div>
              )}

              {activeSubTab === 'ACCESS' && (
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-emerald-700" />
                      Conditions et Formule de Sélection
                    </h3>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                      {detail.accessConditions}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                    <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Filières de Baccalauréat Éligibles :
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {detail.acceptedBacs.map((bac, idx) => (
                        <span key={idx} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
                          {bac}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      Procédure de Candidature en Ligne
                    </h4>
                    <p className="mt-1.5 text-slate-600 leading-relaxed">
                      {detail.candidatureProcedure}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      Structure du Concours Écrit
                    </h4>
                    <p className="mt-1.5 text-slate-600 leading-relaxed">
                      {detail.concoursDetails}
                    </p>
                  </div>

                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <p>{detail.importantNotes}</p>
                  </div>
                </div>
              )}

              {activeSubTab === 'FILIERES' && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <Award className="h-4 w-4 text-indigo-700" />
                    Filières et Spécialités d’Ingénierie &amp; Management
                  </h3>
                  <p className="text-slate-600 text-xs">
                    Les spécialités suivantes sont dispensées au sein des différents campus de l’établissement :
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {detail.filieres.map((f, idx) => (
                      <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs flex items-center gap-2.5">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-100 font-mono font-bold text-[10px] text-blue-900">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-slate-800">{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <span className="font-bold text-slate-900 text-xs">Poursuite d’Études Supérieures :</span>
                    <p className="mt-1 text-slate-600 text-xs leading-relaxed">{detail.furtherStudies}</p>
                  </div>
                </div>
              )}

              {activeSubTab === 'CAREERS' && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-700" />
                    Débouchés Professionnels &amp; Métiers Cibles
                  </h3>
                  <p className="text-slate-600 text-xs">
                    Principales fonctions occupées par les lauréats sur le marché de l’emploi marocain et international :
                  </p>

                  <ul className="space-y-2 pt-1">
                    {detail.careerOutcomes.map((career, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{career}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeSubTab === 'FAQ' && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-amber-600" />
                    Questions Fréquentes sur cet Établissement
                  </h3>

                  <div className="space-y-3">
                    {detail.faq.map((item, idx) => (
                      <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1.5">
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">{item.question}</p>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Official Source Footer Bar */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                  <span>Informations indicatives. Seules les publications officielles font foi.</span>
                </div>

                <a
                  href={detail.officialSource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-bold underline cursor-pointer"
                >
                  <span>Source officielle : {detail.officialSource.label}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </>
          ) : (
            <div className="p-8 text-center space-y-3">
              <p className="text-sm font-semibold text-slate-700">
                Fiche détaillée en cours de vérification auprès des sources officielles pour cet établissement.
              </p>
              <p className="text-xs text-slate-500">
                Informations à vérifier auprès de la source officielle et des portails ministériels (tawjihi.ma / ensup.gov.ma).
              </p>
            </div>
          )}
        </div>

        {/* Modal Bottom Close */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3.5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
          >
            Fermer la fiche
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetailModal;
