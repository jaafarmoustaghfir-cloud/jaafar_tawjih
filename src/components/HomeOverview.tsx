import React from 'react';
import {
  GraduationCap,
  Calculator,
  Award,
  BookOpen,
  Compass,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileText,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import AdSenseUnit from './AdSenseUnit';

interface HomeOverviewProps {
  onNavigateTab: (tab: 'CALCULATOR' | 'QUIZ' | 'SCHOOLS' | 'CONCOURS' | 'GUIDES' | 'FILIERES' | 'FAQ') => void;
  onSelectSchool?: (schoolId: string) => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({ onNavigateTab, onSelectSchool }) => {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* 1. HERO VALUE PROPOSITION CARD */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-md sm:p-10">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-amber-400/10 to-blue-600/10 blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-gradient-to-tr from-cyan-400/10 to-indigo-600/10 blur-3xl"></div>

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Orientation Universitaire &amp; Post-Bac au Maroc</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3.5xl">
            Votre boussole académique pour réussir votre intégration dans l’enseignement supérieur marocain
          </h2>

          <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
            <strong>JAAFAR TAWJIH</strong> est une plateforme indépendante d’orientation éducative, conçue pour accompagner
            les bacheliers marocains (Sciences Mathématiques, Sciences Physiques, SVT, Économie, Techniques et Lettres) dans le choix
            stratégique de leurs études supérieures, le calcul de leurs chances d’admissibilité et l’entraînement rigoureux aux concours d’accès.
          </p>

          {/* Core Action Callouts */}
          <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-4">
            <button
              onClick={() => onNavigateTab('CALCULATOR')}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-left transition hover:border-amber-400 hover:bg-amber-50/40 hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                  <Calculator className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-amber-600" />
              </div>
              <div className="mt-3">
                <span className="block text-xs font-bold text-slate-900">Calculateur 75/25</span>
                <span className="text-[11px] text-slate-500">Moyenne pondérée &amp; seuils d’admissibilité</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab('QUIZ')}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-left transition hover:border-cyan-400 hover:bg-cyan-50/40 hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600">
                  <Award className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-cyan-600" />
              </div>
              <div className="mt-3">
                <span className="block text-xs font-bold text-slate-900">QCM Concours Réels</span>
                <span className="text-[11px] text-slate-500">ENSA 2024, Médecine 2025, 2022 &amp; FMP</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab('SCHOOLS')}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-left transition hover:border-blue-400 hover:bg-blue-50/40 hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                  <Building2 className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600" />
              </div>
              <div className="mt-3">
                <span className="block text-xs font-bold text-slate-900">Fiches Écoles</span>
                <span className="text-[11px] text-slate-500">ENSA, ENSAM, ENCG, EST, FST, CPGE</span>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab('GUIDES')}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-left transition hover:border-emerald-400 hover:bg-emerald-50/40 hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                  <BookOpen className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-600" />
              </div>
              <div className="mt-3">
                <span className="block text-xs font-bold text-slate-900">Guides Pratiques</span>
                <span className="text-[11px] text-slate-500">Comparatifs EST vs FST, ENSA vs ENSAM</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE & WHAT STUDENTS FIND */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-800">
            <Compass className="h-4 w-4 text-blue-600" />
            <span>À qui s’adresse JAAFAR TAWJIH ?</span>
          </div>

          <h3 className="text-lg font-black text-slate-900">
            Un accompagnement dédié à tous les profils de bacheliers au Maroc
          </h3>

          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
              <span><strong>Sciences Mathématiques (SM A &amp; B) :</strong> Optimisation des choix entre CPGE, ENSA, ENSAM, Médecine et cycles universitaires sélectifs.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
              <span><strong>Sciences Physiques (PC) &amp; SVT :</strong> Cartographie précise des seuils réels pour sécuriser son admission en école d'ingénieurs, en médecine ou en technologie (EST/FST).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
              <span><strong>Sciences Économiques &amp; Gestion :</strong> Préparation ciblée au concours TAFEM (ENCG), à l'ISCAE, aux BTS tertiaires et aux filières universitaires d'excellence.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
              <span><strong>Sciences et Technologies (STE / STM) :</strong> Orientation vers l’ENSAM, l’ENSA, les CPGE TSI et les filières DUT appliquées.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">
            <GraduationCap className="h-4 w-4 text-emerald-600" />
            <span>Ce que vous trouvez sur la plateforme</span>
          </div>

          <h3 className="text-lg font-black text-slate-900">
            Des outils concrets et vérifiés, loin des promesses artificielles
          </h3>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <p className="font-bold text-slate-900">1. Simulateur de Seuil basé sur la formule ministérielle</p>
              <p className="text-slate-500 mt-0.5 text-[11px]">
                Application stricte du calcul officiel : 75% Examen National + 25% Examen Régional, avec comparaison immédiate aux seuils historiques observés dans plus de 40 établissements.
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <p className="font-bold text-slate-900">2. Annales officielles interactives avec formules KaTeX</p>
              <p className="text-slate-500 mt-0.5 text-[11px]">
                Véritables épreuves de concours (ENSA 2024, Médecine 2025, 2022, FMP Rabat 2018) avec chronomètre, correction détaillée question par question et figures physiques/mathématiques réelles.
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <p className="font-bold text-slate-900">3. Fiches Établissements &amp; Sources Officielles</p>
              <p className="text-slate-500 mt-0.5 text-[11px]">
                Conditions d’accès, filières, durée d’études, débouchés professionnels et liens directs vérifiés vers les portails gouvernementaux (Tawjihi.ma, Cursom.ma, Ensup.gov.ma).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANT ADSENSE UNIT IN HIGH-VALUE ORIENTATION CONTEXT */}
      <AdSenseUnit slot="home_between_sections" />

      {/* 3. CORE INSTITUTIONS OVERVIEW CARDS */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Grandes Écoles et Universités Référencées
            </h3>
            <p className="text-xs text-slate-500">
              Découvrez les modalités d’accès, filières et débouchés des principaux réseaux publics du Maroc.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('SCHOOLS')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer self-start sm:self-auto"
          >
            <span>Voir l’annuaire complet (40+ écoles)</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              id: 'ensa',
              tag: 'Ingénierie d’État',
              title: 'ENSA Maroc (12 Écoles)',
              desc: 'Réseau public d’ingénieurs en 5 ans. Génie Informatique, Civil, Industriel, Électrique et Mécatronique.',
              seuil: '12.0 à 15.0 / 20',
              badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
            },
            {
              id: 'ensam',
              tag: 'Technologie & Industrie',
              title: 'ENSAM (Meknès, Casablanca, Rabat)',
              desc: 'Grande école d’ingénieurs orientée mécanique, électromécanique, productique et industrie 4.0.',
              seuil: '12.0 à 16.0 / 20',
              badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
            },
            {
              id: 'encg',
              tag: 'Management & Commerce',
              title: 'ENCG Maroc (12 Écoles)',
              desc: 'Écoles Nationales de Commerce et de Gestion en 5 ans. Audit, Finance, Marketing et Commerce International.',
              seuil: '12.0 à 14.0 / 20',
              badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
            },
            {
              id: 'fmp',
              tag: 'Médecine & Santé',
              title: 'FMP / FMD (Facultés de Médecine)',
              desc: 'Études médicales, pharmaceutiques et dentaires en 6 ans. Concours national commun sous format QCM.',
              seuil: '~12.00 / 20',
              badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
            },
            {
              id: 'est',
              tag: 'Cursus Court Bac+2',
              title: 'EST (Écoles Supérieures de Technologie)',
              desc: 'DUT en 2 ans axé sur la pratique et l’insertion rapide ou passerelle vers les écoles d’ingénieurs.',
              seuil: '10.5 à 12.5 / 20',
              badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
            },
            {
              id: 'cpge',
              tag: 'Filière d’Élite en 2 ans',
              title: 'CPGE (Classes Préparatoires)',
              desc: 'Préparation intensive au Concours National Commun (CNC) pour intégrer l’EMI, l’EHTP, l’ENSIAS, etc.',
              seuil: '14.0 à 16.5 / 20',
              badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
            },
          ].map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300 hover:shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${item.badgeColor}`}>
                    {item.tag}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500 font-semibold">
                    Seuil indicatif : {item.seuil}
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (onSelectSchool) onSelectSchool(item.id);
                    onNavigateTab('SCHOOLS');
                  }}
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer flex items-center gap-1"
                >
                  <span>Fiche détaillée &amp; critères</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. METHODOLOGY & TRUST STATEMENT */}
      <section className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-xl sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="h-4 w-4" />
          <span>Charte de Transparence &amp; Rigueur</span>
        </div>

        <h3 className="text-xl font-black tracking-tight sm:text-2xl text-white">
          Une plateforme d’information éducative, indépendante et vérifiée
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
          JAAFAR TAWJIH n’a aucun lien commercial ou juridique avec le Ministère de l’Enseignement Supérieur, ni avec
          aucune université ou école mentionnée. Notre mission est d’apporter aux familles et aux élèves une information
          claire, dénuée de faux espoirs, pour leur permettre de construire une stratégie d’orientation réaliste et sécurisée.
        </p>

        <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3 text-xs">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 space-y-1">
            <span className="font-bold text-amber-300">Données Historiques Réelles</span>
            <p className="text-slate-400 text-[11px]">Seuils et barèmes basés sur les circulaires officielles antérieures.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 space-y-1">
            <span className="font-bold text-amber-300">Zéro Inscription Obligatoire</span>
            <p className="text-slate-400 text-[11px]">Accès libre et gratuit au calculateur et aux fiches sans collecte de données privées.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 space-y-1">
            <span className="font-bold text-amber-300">Renvoi aux Portails Officiels</span>
            <p className="text-slate-400 text-[11px]">Chaque fiche fournit le lien officiel ministériel pour finaliser sa candidature.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeOverview;
