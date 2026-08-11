import React from 'react';
import { ShieldCheck, Lock, Eye, Cookie, FileText, Mail } from 'lucide-react';

export const PrivacyView: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Banner Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-md border border-slate-800 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Protection des Données</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Politique de Confidentialité
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Transparence sur la gestion de vos données et le respect de votre vie privée sur JAAFAR TAWJIH.
        </p>
      </div>

      {/* Main Privacy Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-700" />
            1. Collecte des Données Personnelles
          </h2>
          <p>
            L'utilisation des outils de simulation et de préparation sur <strong>JAAFAR TAWJIH</strong> ne nécessite aucune création de compte ni communication obligatoire de données d'identité personnelles (nom, prénom, numéro de pièce d'identité).
          </p>
          <p>
            Les notes saisies dans le calculateur de seuil sont traitées directement et localement dans votre navigateur Internet et ne sont pas enregistrées dans une base de données nominative.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2 border-t border-slate-100 pt-5">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Cookie className="w-4 h-4 text-amber-600" />
            2. Utilisation des Cookies
          </h2>
          <p>
            Un « cookie » est un petit fichier texte déposé sur votre terminal lors de la visite d'un site. JAAFAR TAWJIH peut utiliser des cookies pour :
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
            <li>Garantir le bon fonctionnement technique et la fluidité de la navigation ;</li>
            <li>Mémoriser vos préférences d'affichage (filière choisie, filtres) au sein de la même session ;</li>
            <li>Mesurer de manière anonyme l'audience du site pour en améliorer la qualité.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-2 border-t border-slate-100 pt-5">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Eye className="w-4 h-4 text-indigo-600" />
            3. Publicité et Google AdSense
          </h2>
          <p>
            Ce site utilise Google AdSense pour afficher des annonces publicitaires. Google utilise des cookies pour diffuser des annonces basées sur les visites antérieures des utilisateurs sur ce site ou sur d'autres sites Web.
          </p>
          <p>
            Les cookies publicitaires permettent à Google et à ses partenaires de diffuser des annonces adaptées aux utilisateurs. Vous pouvez choisir de désactiver la publicité personnalisée dans les <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline">paramètres des annonces Google</a>.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2 border-t border-slate-100 pt-5">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            4. Services Tiers et Liens Externes
          </h2>
          <p>
            JAAFAR TAWJIH peut contenir des liens vers des sites Web externes (sites officiels d'universités, réseaux sociaux, ministères). Nous déclinons toute responsabilité quant aux pratiques de confidentialité ou au contenu de ces sites tiers.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-2 border-t border-slate-100 pt-5">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-600" />
            5. Droits des Utilisateurs &amp; Contact
          </h2>
          <p>
            Conformément aux réglementations applicables en matière de protection des données, vous disposez d'un droit d'accès, de rectification et de suppression des informations vous concernant.
          </p>
          <p className="font-medium text-slate-800">
            Pour toute question ou demande concernant la confidentialité :
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-800">
            Email : jaafarmoustaghfir@gmail.com
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyView;
