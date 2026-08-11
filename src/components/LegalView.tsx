import React from 'react';
import { Scale, Building2, AlertTriangle, FileCheck, Mail } from 'lucide-react';

export const LegalView: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Banner Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-md border border-slate-800 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5 text-blue-400" />
          <span>Cadre Légal &amp; Édition</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Mentions Légales
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Informations réglementaires et conditions d'utilisation du service JAAFAR TAWJIH.
        </p>
      </div>

      {/* Main Legal Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        
        {/* Publisher info */}
        <section className="space-y-3">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-800" />
            1. Édition du Site
          </h2>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 font-sans">
            <p className="font-bold text-slate-900">Nom de la plateforme : JAAFAR TAWJIH</p>
            <p><strong>Nature de l'activité :</strong> Plateforme indépendante d'information, de simulation d'admissibilité et de préparation académique.</p>
            <p><strong>Fondateur &amp; Éditeur :</strong> Jaafar Moustaghfir</p>
            <p><strong>Contact électronique :</strong> jaafarmoustaghfir@gmail.com</p>
            <p><strong>Hébergement :</strong> Infrastructure Cloud haute disponibilité.</p>
          </div>
        </section>

        {/* Independence & Non-affiliation */}
        <section className="space-y-3 border-t border-slate-100 pt-5">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            2. Statut d'Indépendance
          </h2>
          <p>
            <strong>JAAFAR TAWJIH</strong> est un service privé et indépendant. Le site n'a aucun lien juridique, commercial, ni affiliation officielle avec le Ministère de l'Enseignement Supérieur du Maroc, ni avec les universités, écoles (ENSA, ENSAM, ENCG, FMP, FMD, EHTP, etc.) ou instituts cités.
          </p>
          <p>
            Les dénominations, logos et marques cités demeurent la propriété exclusive de leurs détenteurs respectifs et ne sont utilisés qu'à des fins d'information et d'orientation académique.
          </p>
        </section>

        {/* Informational Disclaimer */}
        <section className="space-y-3 border-t border-slate-100 pt-5">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            3. Portée des Informations &amp; Responsabilité
          </h2>
          <p>
            Toutes les données, seuils d'accès historiques, calculs de moyenne et résultats affichés sur la plateforme sont fournis à <strong>titre purement indicatif</strong>.
          </p>
          <p>
            Les seuils de sélection varient annuellement. L'éditeur ne saurait être tenu responsable d'une modification de barème par un établissement ou d'une erreur d'interprétation. Les candidats sont invités à consulter les communications officielles publiées sur les portails ministériels.
          </p>
        </section>

        {/* Intellectual property */}
        <section className="space-y-3 border-t border-slate-100 pt-5">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Scale className="w-4 h-4 text-indigo-600" />
            4. Propriété Intellectuelle
          </h2>
          <p>
            La structure générale, la mise en page, les textes originaux et la banque de QCM développés sur JAAFAR TAWJIH sont protégés par le droit d'auteur. Toute reproduction totale ou partielle sans autorisation préalable écrite est interdite.
          </p>
        </section>
      </div>
    </div>
  );
};

export default LegalView;
