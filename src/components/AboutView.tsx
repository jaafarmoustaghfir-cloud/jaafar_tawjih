import React from 'react';
import { Info, ShieldAlert, CheckCircle2, HelpCircle, BookOpen, ExternalLink } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Banner Card */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-md border border-slate-800 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold">
          <Info className="w-3.5 h-3.5 text-amber-400" />
          <span>Informations Officieuses &amp; Orientation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          À propos de JAAFAR TAWJIH
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
          Plateforme indépendante d'accompagnement, de simulation d'admissibilité et d'entraînement aux concours de l'enseignement supérieur au Maroc.
        </p>
      </div>

      {/* Main Statement Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p className="text-slate-800 font-medium">
            <strong>JAAFAR TAWJIH</strong> est une plateforme indépendante destinée à aider les étudiants à explorer les possibilités d'orientation et de formation dans l'enseignement supérieur marocain.
          </p>

          <p>
            La plateforme fournit des informations, des outils de simulation et des estimations destinés à faciliter les recherches et la préparation académique des étudiants bacheliers.
          </p>

          {/* Important Notice */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs space-y-2">
            <span className="font-bold flex items-center gap-1.5 text-amber-800">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Non-affiliation Institutionnelle :
            </span>
            <p>
              JAAFAR TAWJIH n'est affilié, mandaté ou officiellement lié à aucune université, école supérieure ou institution publique ou privée présentée sur la plateforme.
            </p>
            <p className="text-[11px] text-amber-700 italic">
              Les informations et les seuils présentés sont indicatifs et peuvent changer chaque année. Les utilisateurs doivent toujours vérifier les conditions et informations finales auprès des sources officielles.
            </p>
          </div>
        </div>

        {/* Educational Content / Explanations Section */}
        <div className="border-t border-slate-100 pt-6 space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-800" />
            Comprendre les Seuils et l'Admissibilité au Maroc
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Différence entre Seuil et Admission
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Le <strong>seuil d'admissibilité</strong> est la note minimale requise pour être présélectionné à passer le concours écrit ou oral d'une école. L'<strong>admission définitive</strong> dépend ensuite de la réussite aux épreuves du concours et du rang au classement final.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                Fonctionnement du Calculateur
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Le calculateur applique la formule officielle (<strong>75% Examen National + 25% Examen Régional</strong>) pour comparer votre moyenne pondérée aux seuils historiques observés lors des précédentes sessions de sélection.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                Pourquoi les Résultats sont Indicatifs ?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Les seuils varient chaque année selon le niveau global des candidats, le nombre de places ouvertes et la stratégie de sélection de chaque établissement. Une moyenne supérieure au seuil indicatif n'assure pas automatiquement la sélection.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
                Importance des Sources Officielles
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Consultez régulièrement les portails officiels (cursom.ma, enseignesup.gov.ma, sites des universités) pour vérifier les dates de candidature, les avis de concours et les résultats d'affichage officiels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
