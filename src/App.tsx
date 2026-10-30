import React, { useState, useMemo, useEffect } from 'react';
import {
  SchoolFr,
  BAC_NAMES,
  SCHOOLS_FR,
  BacType,
  SchoolCategory,
  isSchoolWithConcours,
} from './data/schools_fr';
import MedecineQuizApp from './components/MedecineQuizApp';
import HomeOverview from './components/HomeOverview';
import SchoolDetailModal from './components/SchoolDetailModal';
import ConcoursView from './components/ConcoursView';
import GuidesView from './components/GuidesView';
import FilieresView from './components/FilieresView';
import FaqView from './components/FaqView';
import AboutView from './components/AboutView';
import PrivacyView from './components/PrivacyView';
import LegalView from './components/LegalView';
import ContactView from './components/ContactView';
import AdSenseUnit from './components/AdSenseUnit';
import { AdminPortal } from './components/AdminPortal';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './firebaseErrors';
import {
  GraduationCap,
  Calculator,
  Sparkles,
  Search,
  Phone,
  Mail,
  X,
  Instagram,
  Award,
  BookOpen,
  Info,
  ShieldAlert,
  Home,
  Building2,
  Compass,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  XCircle,
  AlertCircle,
  Filter,
} from 'lucide-react';

export type EvaluatedStatus = 'ADMIS' | 'CONCOURS' | 'NON_ADMIS';

export interface EvaluatedSchool {
  school: SchoolFr;
  hasConcours: boolean;
  status: EvaluatedStatus;
  statusLabel: string;
  isAvailable: boolean;
  concoursThreshold: number | null;
  directThreshold: number | null;
  referenceThreshold: number | null;
  delta: number | null;
}

export function evaluateSchool(
  school: SchoolFr,
  userScore: number,
  type: BacType
): EvaluatedSchool {
  const hasConcours = isSchoolWithConcours(school);
  const rawThreshold = school.thresholds?.[type];
  const isAccepted = school.acceptedBacs.includes(type);
  const isAvailable =
    isAccepted &&
    typeof rawThreshold === 'number' &&
    rawThreshold > 0 &&
    rawThreshold < 90;

  if (!isAvailable) {
    return {
      school,
      hasConcours,
      status: 'NON_ADMIS',
      statusLabel: 'Seuil non disponible',
      isAvailable: false,
      concoursThreshold: null,
      directThreshold: null,
      referenceThreshold: null,
      delta: null,
    };
  }

  if (hasConcours) {
    const concoursThreshold = rawThreshold;
    const directThreshold =
      school.directThresholds?.[type] ??
      Math.min(19.5, Number((concoursThreshold + (concoursThreshold >= 16 ? 1.5 : 2.5)).toFixed(2)));

    if (userScore >= directThreshold) {
      return {
        school,
        hasConcours: true,
        status: 'ADMIS',
        statusLabel: 'Admis',
        isAvailable: true,
        concoursThreshold,
        directThreshold,
        referenceThreshold: directThreshold,
        delta: Number((userScore - directThreshold).toFixed(2)),
      };
    } else if (userScore >= concoursThreshold) {
      return {
        school,
        hasConcours: true,
        status: 'CONCOURS',
        statusLabel: 'Admis au concours',
        isAvailable: true,
        concoursThreshold,
        directThreshold,
        referenceThreshold: concoursThreshold,
        delta: Number((userScore - concoursThreshold).toFixed(2)),
      };
    } else {
      return {
        school,
        hasConcours: true,
        status: 'NON_ADMIS',
        statusLabel: 'Non admis',
        isAvailable: true,
        concoursThreshold,
        directThreshold,
        referenceThreshold: concoursThreshold,
        delta: Number((userScore - concoursThreshold).toFixed(2)),
      };
    }
  } else {
    // School without concours: strictly "Admis" or "Non admis"
    const directThreshold = school.directThresholds?.[type] ?? rawThreshold;
    if (userScore >= directThreshold) {
      return {
        school,
        hasConcours: false,
        status: 'ADMIS',
        statusLabel: 'Admis',
        isAvailable: true,
        concoursThreshold: null,
        directThreshold,
        referenceThreshold: directThreshold,
        delta: Number((userScore - directThreshold).toFixed(2)),
      };
    } else {
      return {
        school,
        hasConcours: false,
        status: 'NON_ADMIS',
        statusLabel: 'Non admis',
        isAvailable: true,
        concoursThreshold: null,
        directThreshold,
        referenceThreshold: directThreshold,
        delta: Number((userScore - directThreshold).toFixed(2)),
      };
    }
  }
}

export function formatDelta(delta: number | null): { text: string; badgeClass: string } {
  if (delta === null) {
    return { text: '—', badgeClass: 'text-slate-400 bg-slate-100 border border-slate-200' };
  }
  if (delta > 0) {
    return {
      text: `+${delta.toFixed(2).replace('.', ',')} pts`,
      badgeClass: 'text-emerald-800 bg-emerald-50 border border-emerald-300 font-bold',
    };
  }
  if (delta < 0) {
    return {
      text: `-${Math.abs(delta).toFixed(2).replace('.', ',')} pts`,
      badgeClass: 'text-rose-800 bg-rose-50 border border-rose-300 font-bold',
    };
  }
  return {
    text: '0,00 pts',
    badgeClass: 'text-slate-700 bg-slate-100 border border-slate-300 font-bold',
  };
}

const isConcoursSchool = (schoolId: string) => {
  const normalized = schoolId.toLowerCase();
  return (
    normalized === 'ensa' ||
    normalized === 'ensam' ||
    normalized === 'ensck' ||
    normalized === 'encg' ||
    normalized === 'fmp' ||
    normalized === 'fmd' ||
    normalized === 'ispits' ||
    normalized === 'ena_archi' ||
    normalized === 'ens' ||
    normalized === 'esef' ||
    normalized === 'iscae' ||
    normalized === 'ifmeree' ||
    text_check_isic_isitt_trad(normalized)
  );
};

function text_check_isic_isitt_trad(id: string) {
  return id === 'isic' || id === 'isitt' || id === 'fahd_traduction';
}

export type TabType =
  | 'HOME'
  | 'CALCULATOR'
  | 'SCHOOLS'
  | 'CONCOURS'
  | 'QUIZ'
  | 'GUIDES'
  | 'FILIERES'
  | 'FAQ'
  | 'ABOUT'
  | 'PRIVACY'
  | 'LEGAL'
  | 'CONTACT'
  | 'ADMIN';

export default function App() {
  const checkIsAdminPath = () => {
    if (typeof window === 'undefined') return false;
    const cleanPath = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    const cleanHash = window.location.hash.toLowerCase().replace(/\/+$/, '');
    return (
      cleanPath === '/admin' ||
      cleanPath.startsWith('/admin/') ||
      cleanHash === '#admin' ||
      cleanHash === '#/admin'
    );
  };

  const getInitialTab = (): TabType => {
    if (checkIsAdminPath()) return 'ADMIN';
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
      if (hash === 'calculator' || hash === 'calculateur') return 'CALCULATOR';
      if (hash === 'quiz' || hash === 'qcm') return 'QUIZ';
      if (hash === 'schools' || hash === 'ecoles') return 'SCHOOLS';
      if (hash === 'concours') return 'CONCOURS';
      if (hash === 'guides') return 'GUIDES';
      if (hash === 'filieres') return 'FILIERES';
      if (hash === 'faq') return 'FAQ';
      if (hash === 'about') return 'ABOUT';
      if (hash === 'contact') return 'CONTACT';
      if (hash === 'privacy') return 'PRIVACY';
      if (hash === 'legal') return 'LEGAL';
    }
    return 'HOME';
  };

  const [activeTab, setActiveTab] = useState<TabType>(getInitialTab);
  const [selectedSchoolIdForModal, setSelectedSchoolIdForModal] = useState<string | null>(null);
  const [quizExamKey, setQuizExamKey] = useState<'ENSA_2024' | 'MEDECINE_2025' | 'MEDECINE_2022' | 'FMP_RABAT_2018'>('ENSA_2024');

  const navigateTo = (tab: TabType, hashName?: string) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.location.hash = hashName || tab.toLowerCase();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleLocationChange = () => {
      if (checkIsAdminPath()) {
        setActiveTab('ADMIN');
      } else {
        const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
        if (hash === 'calculator') setActiveTab('CALCULATOR');
        else if (hash === 'quiz' || hash === 'qcm') setActiveTab('QUIZ');
        else if (hash === 'schools' || hash === 'ecoles') setActiveTab('SCHOOLS');
        else if (hash === 'concours') setActiveTab('CONCOURS');
        else if (hash === 'guides') setActiveTab('GUIDES');
        else if (hash === 'filieres') setActiveTab('FILIERES');
        else if (hash === 'faq') setActiveTab('FAQ');
        else if (hash === 'about') setActiveTab('ABOUT');
        else if (hash === 'contact') setActiveTab('CONTACT');
        else if (hash === 'privacy') setActiveTab('PRIVACY');
        else if (hash === 'legal') setActiveTab('LEGAL');
        else if (hash === '' || hash === 'home') setActiveTab('HOME');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Initial calculator states
  const [bacType, setBacType] = useState<BacType>('PC');
  const [nationalGrade, setNationalGrade] = useState<string>('14.75');
  const [regionalGrade, setRegionalGrade] = useState<string>('15.50');
  const [hasChecked, setHasChecked] = useState<boolean>(true);

  // Live schools from Firestore ecoles collection
  const [liveSchools, setLiveSchools] = useState<SchoolFr[]>(SCHOOLS_FR);

  useEffect(() => {
    const fetchFirestoreSchools = async () => {
      try {
        const snap = await getDocs(collection(db, 'ecoles'));
        if (!snap.empty) {
          const fetched: SchoolFr[] = [];
          snap.forEach((d) => {
            const data = d.data();
            const seuil = typeof data.seuil_preselection === 'number' ? data.seuil_preselection : 14.0;
            fetched.push({
              id: d.id,
              name: data.nom || 'École Supérieure',
              city: 'Maroc',
              category: 'Ingénierie / Sciences',
              acceptedBacs: ['SM', 'PC', 'SVT', 'Eco', 'Tech', 'Lettres'],
              thresholds: {
                SM: seuil,
                PC: seuil,
                SVT: seuil,
                Tech: seuil,
                Eco: seuil,
                Lettres: seuil,
              },
            });
          });
          setLiveSchools([...fetched, ...SCHOOLS_FR]);
        }
      } catch (e: any) {
        handleFirestoreError(e, OperationType.LIST, 'ecoles');
        setLiveSchools(SCHOOLS_FR);
      }
    };
    fetchFirestoreSchools();
  }, []);

  // Filters state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [selectedStatus, setSelectedStatus] = useState<string>('Tous');
  const [errors, setErrors] = useState<{ national?: string; regional?: string }>({});

  const finalScore = useMemo(() => {
    const nat = parseFloat(nationalGrade);
    const reg = parseFloat(regionalGrade);
    if (!isNaN(nat) && nat >= 0 && nat <= 20 && !isNaN(reg) && reg >= 0 && reg <= 20) {
      return nat * 0.75 + reg * 0.25;
    }
    return 0;
  }, [nationalGrade, regionalGrade]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const nat = parseFloat(nationalGrade);
    const reg = parseFloat(regionalGrade);

    const newErrors: { national?: string; regional?: string } = {};
    if (isNaN(nat) || nat < 0 || nat > 20) {
      newErrors.national = 'Entrez une note valide entre 0 et 20';
    }
    if (isNaN(reg) || reg < 0 || reg > 20) {
      newErrors.regional = 'Entrez une note valide entre 0 et 20';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setHasChecked(false);
      return;
    }

    setErrors({});
    setHasChecked(true);
  };

  const getSchoolEligibility = (school: SchoolFr, score: number, type: BacType) => {
    const evalResult = evaluateSchool(school, score, type);
    if (!evalResult.isAvailable) {
      return {
        status: 'NON_ELIGIBLE' as const,
        label: 'Seuil non disponible',
        bgColor: 'bg-slate-100 border-slate-200',
        textColor: 'text-slate-500',
        delta: null,
      };
    }
    if (evalResult.status === 'ADMIS') {
      return {
        status: 'ADMIS' as const,
        label: '🟢 ADMIS (SUR DOSSIER)',
        bgColor: 'bg-emerald-50 border-emerald-100',
        textColor: 'text-emerald-800',
        delta: evalResult.delta,
      };
    }
    if (evalResult.status === 'CONCOURS') {
      return {
        status: 'CONCOURS' as const,
        label: '🔵 ADMIS AU CONCOURS',
        bgColor: 'bg-blue-50 border-blue-100',
        textColor: 'text-blue-800',
        delta: evalResult.delta,
      };
    }
    return {
      status: 'DIFFICILE' as const,
      label: '🔴 NON ADMIS (SOUS LE SEUIL)',
      bgColor: 'bg-slate-50 border-slate-200',
      textColor: 'text-rose-700 font-bold',
      delta: evalResult.delta,
    };
  };

  // Calculator optional filter & search states
  const [calcFilter, setCalcFilter] = useState<'TOUS' | 'ADMIS' | 'CONCOURS' | 'NON_ADMIS'>('TOUS');
  const [calcSearch, setCalcSearch] = useState<string>('');

  // 1. Evaluate ALL schools without filtering any out using .map()
  const allEvaluatedSchools = useMemo(() => {
    if (finalScore <= 0) return [];
    return liveSchools.map((school) => evaluateSchool(school, finalScore, bacType));
  }, [liveSchools, finalScore, bacType]);

  // 2. Sort by:
  // First "Admis", then "Admis au concours", then "Non admis"
  // Inside each group: from highest threshold to lowest!
  const sortedEvaluatedSchools = useMemo(() => {
    const statusRank: Record<EvaluatedStatus, number> = {
      ADMIS: 1,
      CONCOURS: 2,
      NON_ADMIS: 3,
    };

    return [...allEvaluatedSchools].sort((a, b) => {
      if (statusRank[a.status] !== statusRank[b.status]) {
        return statusRank[a.status] - statusRank[b.status];
      }
      const threshA = a.referenceThreshold ?? -1;
      const threshB = b.referenceThreshold ?? -1;
      if (threshA !== threshB) {
        return threshB - threshA; // du seuil le plus élevé au plus bas
      }
      return a.school.name.localeCompare(b.school.name);
    });
  }, [allEvaluatedSchools]);

  // 3. Status counters for the filter buttons
  const calcCounts = useMemo(() => {
    return {
      TOUS: sortedEvaluatedSchools.length,
      ADMIS: sortedEvaluatedSchools.filter((s) => s.status === 'ADMIS').length,
      CONCOURS: sortedEvaluatedSchools.filter((s) => s.status === 'CONCOURS').length,
      NON_ADMIS: sortedEvaluatedSchools.filter((s) => s.status === 'NON_ADMIS').length,
    };
  }, [sortedEvaluatedSchools]);

  // 4. Displayed schools based on optional filters
  const displayedCalcSchools = useMemo(() => {
    return sortedEvaluatedSchools.filter((item) => {
      if (calcFilter === 'ADMIS' && item.status !== 'ADMIS') return false;
      if (calcFilter === 'CONCOURS' && item.status !== 'CONCOURS') return false;
      if (calcFilter === 'NON_ADMIS' && item.status !== 'NON_ADMIS') return false;

      if (calcSearch.trim()) {
        const q = calcSearch.toLowerCase();
        const match =
          item.school.name.toLowerCase().includes(q) ||
          item.school.city.toLowerCase().includes(q) ||
          item.school.category.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [sortedEvaluatedSchools, calcFilter, calcSearch]);

  const filteredSchools = useMemo(() => {
    return liveSchools.filter((school) => {
      const textToSearch = `${school.name} ${school.city} ${school.category}`.toLowerCase();
      if (searchQuery && !textToSearch.includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (selectedCategory !== 'Toutes' && school.category !== selectedCategory) {
        return false;
      }
      if (selectedStatus !== 'Tous') {
        const eligibility = getSchoolEligibility(school, finalScore, bacType);
        if (selectedStatus === 'ADMIS' && eligibility.status !== 'ADMIS') return false;
        if (selectedStatus === 'DIFFICILE' && eligibility.status !== 'DIFFICILE') return false;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedStatus, finalScore, bacType, liveSchools]);

  const categoriesList: SchoolCategory[] = [
    'Ingénierie / Sciences',
    'Commerce / Gestion',
    'Administration',
    'Formation / Enseignement',
    'Santé / Paramédical',
    'Militaire / Sécurité',
    'Formation Professionnelle',
    'Universités Privées',
    'Spécial Concours',
  ];

  const getBreadcrumbLabel = (tab: TabType) => {
    switch (tab) {
      case 'HOME': return 'Accueil';
      case 'CALCULATOR': return 'Calculateur de Seuil 75/25';
      case 'SCHOOLS': return 'Annuaire des Écoles & Universités';
      case 'CONCOURS': return 'Dossiers & Préparation des Concours';
      case 'QUIZ': return 'QCM d’Entraînement en Ligne';
      case 'GUIDES': return 'Guides d’Orientation Post-Bac';
      case 'FILIERES': return 'Filières & Métiers au Maroc';
      case 'FAQ': return 'Foire Aux Questions (FAQ)';
      case 'ABOUT': return 'À propos de JAAFAR TAWJIH';
      case 'CONTACT': return 'Contact & Assistance';
      case 'PRIVACY': return 'Politique de Confidentialité';
      case 'LEGAL': return 'Mentions Légales';
      default: return tab;
    }
  };

  if (activeTab === 'ADMIN') {
    return (
      <AdminPortal
        onNavigateHome={() => {
          if (typeof window !== 'undefined') {
            window.history.pushState({}, '', '/');
          }
          setActiveTab('HOME');
        }}
      />
    );
  }

  return (
    <div
      className="min-h-screen text-slate-800 font-sans antialiased pb-16 selection:bg-blue-600 selection:text-white"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(248, 250, 252, 0.94), rgba(243, 244, 246, 0.98)), url('https://i.imgur.com/z7DyxIM.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* HEADER BANNER */}
      <header className="bg-white/95 backdrop-blur-md border-b border-amber-500/10 py-7 sm:py-9 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-amber-400 to-indigo-950"></div>

        <div className="max-w-5xl mx-auto px-4 text-center space-y-4 animate-fade-in flex flex-col items-center relative z-10">
          {/* Logo container with luxurious gold-and-navy medallion profile style */}
          <div className="relative group mx-auto flex flex-col items-center justify-center">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-300 to-yellow-600 opacity-50 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-500"></div>

            <div className="relative p-1.5 rounded-full bg-gradient-to-b from-slate-900 to-indigo-950 shadow-2xl flex items-center justify-center border border-amber-400/30">
              <div className="absolute inset-1 rounded-full bg-indigo-950"></div>

              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-amber-400/40 bg-white flex items-center justify-center shadow-inner">
                <img
                  src="/assets/aistudio/Gemini_Generated_Image_5t8dk85t8dk85t8d_211e6919.jpeg"
                  alt="Jaafar Tawjih - Orientation & Excellence Maroc"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('/logo.png')) {
                      target.src = '/logo.png';
                    } else {
                      target.style.display = 'none';
                      const fb = document.getElementById('logo-fallback');
                      if (fb)
                        fb.className =
                          'w-full h-full rounded-full bg-gradient-to-tr from-indigo-950 to-slate-900 flex items-center justify-center text-amber-400';
                    }
                  }}
                />
                <div id="logo-fallback" className="hidden">
                  <GraduationCap className="w-14 h-14 text-amber-400" />
                </div>
              </div>

              <div className="absolute bottom-1 right-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 rounded-full p-1.5 border-2 border-white shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-center flex flex-col items-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-3.5 py-1 rounded-full border border-amber-500/30 text-amber-400 text-xs font-semibold shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-amber-300">
                ORIENTATION ACADÉMIQUE DE RÉFÉRENCE
              </span>
              <span className="text-slate-600 font-light">|</span>
              <span className="text-[9px] sm:text-[10px] text-white/95 font-medium tracking-wide">Maroc</span>
            </div>

            <h1 id="app-title" className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 font-sans">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-indigo-900 to-amber-600">
                JAAFAR TAWJIH
              </span>
            </h1>

            <p className="text-slate-600 text-xs max-w-lg mx-auto leading-relaxed font-semibold">
              Portail indépendant d’orientation post-bac au Maroc : Simulateur de seuils d’admissibilité, préparation aux concours écrits (ENSA, Médecine) et dossiers complets des grandes écoles.
            </p>

            {/* Quick Contact Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <a
                href="https://wa.me/212772908456"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200 transition"
              >
                <span>💬 WhatsApp : 07 72 90 84 56</span>
              </a>
              <a
                href="https://www.instagram.com/tawjih_avenir?igsh=a2Qwem1scWE0MjZz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-800 text-[11px] font-bold border border-pink-200 transition"
              >
                <Instagram className="w-3 h-3 text-pink-600" />
                <span>Instagram : @tawjih_avenir</span>
              </a>
            </div>
          </div>
        </div>

        {/* TOP MAIN NAVIGATION BAR */}
        <div className="max-w-5xl mx-auto px-4 mt-5">
          <nav aria-label="Navigation principale" className="bg-slate-900/95 p-1.5 rounded-2xl border border-slate-800 shadow-xl flex flex-wrap items-center justify-center gap-1">
            <button
              onClick={() => navigateTo('HOME', 'home')}
              className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'HOME'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Accueil</span>
            </button>

            <button
              onClick={() => navigateTo('CALCULATOR', 'calculator')}
              className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'CALCULATOR'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculateur Seuil</span>
            </button>

            <button
              onClick={() => navigateTo('SCHOOLS', 'schools')}
              className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'SCHOOLS'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Écoles &amp; Universités</span>
            </button>

            <button
              onClick={() => navigateTo('CONCOURS', 'concours')}
              className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'CONCOURS'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-cyan-300" />
              <span>Concours</span>
            </button>

            <button
              onClick={() => navigateTo('QUIZ', 'quiz')}
              className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'QUIZ'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>QCM Interactifs</span>
            </button>

            <button
              onClick={() => navigateTo('GUIDES', 'guides')}
              className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'GUIDES'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Guides Post-Bac</span>
            </button>

            <button
              onClick={() => navigateTo('FILIERES', 'filieres')}
              className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'FILIERES'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Filières</span>
            </button>

            <button
              onClick={() => navigateTo('FAQ', 'faq')}
              className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'FAQ'
                  ? 'bg-slate-800 text-amber-400 font-extrabold border border-amber-400/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FAQ</span>
            </button>

            <button
              onClick={() => navigateTo('ABOUT', 'about')}
              className={`px-2.5 py-2 rounded-xl font-semibold text-xs transition cursor-pointer ${
                activeTab === 'ABOUT'
                  ? 'bg-slate-800 text-amber-400 font-bold border border-amber-400/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              À propos
            </button>

            <button
              onClick={() => navigateTo('CONTACT', 'contact')}
              className={`px-2.5 py-2 rounded-xl font-semibold text-xs transition cursor-pointer ${
                activeTab === 'CONTACT'
                  ? 'bg-slate-800 text-amber-400 font-bold border border-amber-400/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* BREADCRUMB NAVIGATION */}
      {activeTab !== 'HOME' && (
        <div className="max-w-5xl mx-auto px-4 mt-4">
          <nav aria-label="Fil d’Ariane" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <button
              onClick={() => navigateTo('HOME', 'home')}
              className="hover:text-blue-900 transition flex items-center gap-1 text-slate-600 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Accueil</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">{getBreadcrumbLabel(activeTab)}</span>
          </nav>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="max-w-5xl mx-auto px-4 mt-6">
        {/* 1. HOME VIEW */}
        {activeTab === 'HOME' && (
          <HomeOverview
            onNavigateTab={(tab) => navigateTo(tab)}
            onSelectSchool={(schoolId) => {
              setSelectedSchoolIdForModal(schoolId);
            }}
          />
        )}

        {/* 2. CONCOURS DOSSIERS VIEW */}
        {activeTab === 'CONCOURS' && (
          <ConcoursView
            onStartQuiz={(quizKey) => {
              setQuizExamKey(quizKey);
              navigateTo('QUIZ', 'quiz');
            }}
          />
        )}

        {/* 3. INTERACTIVE QUIZ APP */}
        {activeTab === 'QUIZ' && (
          <MedecineQuizApp initialExamKey={quizExamKey} />
        )}

        {/* 4. GUIDES VIEW */}
        {activeTab === 'GUIDES' && (
          <GuidesView
            onNavigateSchools={() => navigateTo('SCHOOLS', 'schools')}
            onStartQuiz={(key) => {
              setQuizExamKey(key);
              navigateTo('QUIZ', 'quiz');
            }}
          />
        )}

        {/* 5. FILIERES VIEW */}
        {activeTab === 'FILIERES' && (
          <FilieresView
            onSelectSchool={(id) => setSelectedSchoolIdForModal(id)}
            onNavigateTab={(tab) => navigateTo(tab)}
          />
        )}

        {/* 6. FAQ VIEW */}
        {activeTab === 'FAQ' && <FaqView />}

        {/* 7. TRUST PAGES */}
        {activeTab === 'ABOUT' && <AboutView />}
        {activeTab === 'PRIVACY' && <PrivacyView />}
        {activeTab === 'LEGAL' && <LegalView />}
        {activeTab === 'CONTACT' && <ContactView />}

        {/* 8. SCHOOLS DIRECTORY (ÉCOLES & UNIVERSITÉS) */}
        {activeTab === 'SCHOOLS' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
                <Building2 className="h-4 w-4" />
                <span>Répertoire Officieux des Écoles Supérieures au Maroc</span>
              </div>

              <h2 className="mt-3 text-2xl font-black sm:text-3.5xl">
                Annuaire Complet des Établissements
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Consultez les critères d’accès, filières, durées d’études et débouchés pour plus de 40 écoles
                et facultés publiques et privées d’excellence au Maroc.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher par nom d'école, filière ou ville (ex: ENSA, Agadir, Médecine)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/15"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                    Secteur d’Enseignement
                  </span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-slate-700 font-semibold cursor-pointer"
                  >
                    <option value="Toutes">Tous les secteurs ({liveSchools.length} établissements)</option>
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                    Filière de Baccalauréat
                  </span>
                  <select
                    value={bacType}
                    onChange={(e) => setBacType(e.target.value as BacType)}
                    className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-slate-700 font-semibold cursor-pointer"
                  >
                    {(Object.keys(BAC_NAMES) as BacType[]).map((type) => (
                      <option key={type} value={type}>
                        {BAC_NAMES[type]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Compliant AdSense Unit Inside Schools Directory */}
            <AdSenseUnit slot="schools_directory_top" label={true} />

            {/* Schools Grid List */}
            <div className="space-y-2.5">
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school) => {
                  const eligibility = getSchoolEligibility(school, finalScore, bacType);
                  return (
                    <div
                      key={school.id}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:shadow-xs"
                    >
                      <div className="flex-1 min-w-0 pr-2 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-600 font-mono">
                            {school.category}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                          {school.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 font-medium">
                          <span>{school.city}</span>
                          <span>•</span>
                          {school.acceptedBacs.includes(bacType) ? (
                            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-mono text-[11px]">
                              Seuil indicatif : {school.thresholds[bacType]}/20
                            </span>
                          ) : (
                            <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded text-[11px]">
                              Bac non compatible
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <button
                          onClick={() => setSelectedSchoolIdForModal(school.id)}
                          className="px-3.5 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Info className="w-3.5 h-3.5 text-amber-300" />
                          <span>Voir la fiche</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                /* HELPFUL EMPTY STATE WITH ZERO ADS */
                <div className="text-center p-8 sm:p-10 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600">
                    <Search className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm sm:text-base text-slate-900">
                      Aucun établissement ne correspond à votre recherche
                    </h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Aucun résultat pour « {searchQuery} ». Essayez de vérifier l'orthographe du nom ou de la ville, ou élargissez vos filtres.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        setSelectedCategory('Toutes');
                        setSelectedStatus('Tous');
                        setSearchQuery('');
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-900 text-white font-bold text-xs shadow-xs hover:bg-blue-800 transition cursor-pointer"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
                    <span>Secteurs populaires :</span>
                    <button
                      onClick={() => {
                        setSelectedCategory('Ingénierie / Sciences');
                        setSearchQuery('');
                      }}
                      className="text-blue-700 underline font-semibold cursor-pointer"
                    >
                      Ingénierie
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => {
                        setSelectedCategory('Commerce / Gestion');
                        setSearchQuery('');
                      }}
                      className="text-blue-700 underline font-semibold cursor-pointer"
                    >
                      Commerce
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => {
                        setSelectedCategory('Santé / Paramédical');
                        setSearchQuery('');
                      }}
                      className="text-blue-700 underline font-semibold cursor-pointer"
                    >
                      Santé &amp; Médecine
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 9. CALCULATOR VIEW */}
        {activeTab === 'CALCULATOR' && (
          <div className="space-y-8 animate-fadeIn">
            {/* INFORMATIONAL SECTION: HOW IT WORKS */}
            <section
              id="how-it-works"
              className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-3"
            >
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-800" />
                Comment fonctionne la formule officielle de seuil au Maroc ?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-mono font-bold text-[10px] flex items-center justify-center">
                    1
                  </span>
                  <p className="font-bold text-slate-800">Note Nationale (75%)</p>
                  <p className="text-slate-500 text-[11px]">
                    L’examen national compte pour 75% du barème de présélection de la majorité des écoles d’ingénieurs, de commerce et de médecine.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-mono font-bold text-[10px] flex items-center justify-center">
                    2
                  </span>
                  <p className="font-bold text-slate-800">Note Régionale (25%)</p>
                  <p className="text-slate-500 text-[11px]">
                    L’examen régional de la 1ère année du baccalauréat compte pour 25% de la moyenne pondérée finale.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-mono font-bold text-[10px] flex items-center justify-center">
                    3
                  </span>
                  <p className="font-bold text-slate-800">Seuil Indicatif</p>
                  <p className="text-slate-500 text-[11px]">
                    Comparez votre résultat aux seuils historiques observés pour estimer vos chances de présélection aux concours.
                  </p>
                </div>
              </div>
            </section>

            {/* INPUT PANEL CARD */}
            <section
              id="calcule-card"
              className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="bg-gradient-to-r from-blue-900 to-indigo-950 px-6 py-4.5 text-white flex items-center justify-between">
                <h2 className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  Calculateur de Score Pondéré Post-Bac
                </h2>
                <span className="text-[10px] font-bold font-mono text-emerald-300 bg-blue-950/60 border border-blue-800/40 px-2.5 py-0.5 rounded">
                  75% National + 25% Régional
                </span>
              </div>

              <form onSubmit={handleVerify} className="p-6 space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                    Filière de votre Baccalauréat
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {(Object.keys(BAC_NAMES) as BacType[]).map((type) => {
                      const isSelected = bacType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setBacType(type)}
                          className={`py-2 px-3 rounded-xl border text-center transition-all duration-150 relative ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-bold ring-2 ring-blue-500/10'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs cursor-pointer'
                          }`}
                        >
                          <span className="block font-bold">{type}</span>
                          <span className="text-[9px] text-slate-450 block truncate font-normal">
                            {BAC_NAMES[type].split(' (')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="national" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Note d’examen National (75%)
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <input
                        id="national"
                        type="number"
                        step="0.01"
                        min="0"
                        max="20"
                        value={nationalGrade}
                        onChange={(e) => setNationalGrade(e.target.value)}
                        placeholder="Ex: 15.25"
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 text-sm font-medium"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">/ 20</span>
                    </div>
                    {errors.national && <p className="text-xs text-rose-600 mt-1">{errors.national}</p>}
                  </div>

                  <div>
                    <label htmlFor="regional" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Note d’examen Régional (25%)
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <input
                        id="regional"
                        type="number"
                        step="0.01"
                        min="0"
                        max="20"
                        value={regionalGrade}
                        onChange={(e) => setRegionalGrade(e.target.value)}
                        placeholder="Ex: 14.50"
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 text-sm font-medium"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">/ 20</span>
                    </div>
                    {errors.regional && <p className="text-xs text-rose-600 mt-1">{errors.regional}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-bold text-sm rounded-xl transition duration-150 shadow-md uppercase tracking-wider cursor-pointer"
                >
                  Vérifier l’éligibilité
                </button>
              </form>
            </section>

            {/* RESULTS WRAPPER DISPLAY */}
            {hasChecked && finalScore > 0 && (
              <div className="space-y-6">
                {/* SCORE HERO CHIP */}
                <div
                  id="score-hero"
                  className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-6 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg border border-amber-500/20"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                      Filière du Baccalauréat
                    </span>
                    <p className="text-lg font-extrabold text-white">{BAC_NAMES[bacType]}</p>
                    <p className="text-xs text-blue-200">
                      Formule officielle : ({nationalGrade} × 75%) + ({regionalGrade} × 25%)
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/20 text-center sm:text-right shrink-0">
                    <span className="text-[10px] text-amber-200 block uppercase font-mono font-bold tracking-wide">
                      Moyenne Pondérée
                    </span>
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white leading-none">
                      {finalScore.toFixed(3)}
                    </span>
                    <span className="text-xs text-blue-200 block mt-1 font-mono">/ 20</span>
                  </div>
                </div>

                {/* MANDATORY DISCLAIMER BOX */}
                <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1.5 shadow-xs">
                  <p className="font-bold text-amber-800 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                    ⚠️ Résultat indicatif :
                  </p>
                  <p className="leading-relaxed">
                    Cette estimation est calculée à partir des seuils historiques observés. Elle ne garantit pas l'admission définitive. Les critères et capacités d'accueil peuvent varier chaque année.
                  </p>
                </div>

                {/* ALL EVALUATED SCHOOLS LIST */}
                <section
                  id="all-evaluated-schools"
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-5"
                >
                  {/* HEADER & SEARCH */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-blue-900" />
                        Liste complète des établissements ({calcCounts.TOUS})
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Statut calculé selon vos notes, trié par admissibilité puis par niveau de seuil.
                      </p>
                    </div>

                    {/* SEARCH INPUT */}
                    <div className="relative w-full sm:w-72">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={calcSearch}
                        onChange={(e) => setCalcSearch(e.target.value)}
                        placeholder="Filtrer par nom, ville ou filière..."
                        className="w-full pl-9 pr-8 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
                      />
                      {calcSearch && (
                        <button
                          type="button"
                          onClick={() => setCalcSearch('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* FILTER TABS WITH COUNTERS (TOUS / ADMIS / CONCOURS / NON ADMIS) */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCalcFilter('TOUS')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                        calcFilter === 'TOUS'
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>Tous</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          calcFilter === 'TOUS' ? 'bg-slate-800 text-amber-300' : 'bg-slate-200 text-slate-800'
                        }`}
                      >
                        {calcCounts.TOUS}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCalcFilter('ADMIS')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                        calcFilter === 'ADMIS'
                          ? 'bg-emerald-700 text-white shadow-sm'
                          : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Admis</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          calcFilter === 'ADMIS' ? 'bg-emerald-800 text-white' : 'bg-emerald-200 text-emerald-900'
                        }`}
                      >
                        {calcCounts.ADMIS}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCalcFilter('CONCOURS')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                        calcFilter === 'CONCOURS'
                          ? 'bg-blue-700 text-white shadow-sm'
                          : 'bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                      <span>Admis au concours</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          calcFilter === 'CONCOURS' ? 'bg-blue-800 text-white' : 'bg-blue-200 text-blue-900'
                        }`}
                      >
                        {calcCounts.CONCOURS}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCalcFilter('NON_ADMIS')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                        calcFilter === 'NON_ADMIS'
                          ? 'bg-rose-700 text-white shadow-sm'
                          : 'bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-200'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                      <span>Non admis</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          calcFilter === 'NON_ADMIS' ? 'bg-rose-800 text-white' : 'bg-rose-200 text-rose-900'
                        }`}
                      >
                        {calcCounts.NON_ADMIS}
                      </span>
                    </button>
                  </div>

                  {/* CARDS LIST OF ALL SCHOOLS */}
                  <div className="space-y-3 pt-1">
                    {displayedCalcSchools.length > 0 ? (
                      displayedCalcSchools.map((item, idx) => {
                        const deltaInfo = formatDelta(item.delta);
                        return (
                          <div
                            key={item.school.id}
                            className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                              item.status === 'ADMIS'
                                ? 'bg-gradient-to-r from-emerald-50/40 via-white to-white border-emerald-300/80 hover:border-emerald-400'
                                : item.status === 'CONCOURS'
                                ? 'bg-gradient-to-r from-blue-50/40 via-white to-white border-blue-300/80 hover:border-blue-400'
                                : item.isAvailable
                                ? 'bg-gradient-to-r from-rose-50/20 via-white to-white border-rose-200/70 hover:border-rose-300'
                                : 'bg-slate-50/80 border-slate-200/80 text-slate-600'
                            }`}
                          >
                            {/* LEFT: RANK, NAME, META, THRESHOLDS */}
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <span
                                className={`w-8 h-8 rounded-xl font-mono text-xs font-bold shrink-0 flex items-center justify-center shadow-xs ${
                                  item.status === 'ADMIS'
                                    ? 'bg-emerald-600 text-white'
                                    : item.status === 'CONCOURS'
                                    ? 'bg-blue-600 text-white'
                                    : item.isAvailable
                                    ? 'bg-slate-700 text-white'
                                    : 'bg-slate-300 text-slate-700'
                                }`}
                              >
                                #{idx + 1}
                              </span>

                              <div className="space-y-1.5 flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-600 font-mono">
                                    {item.school.category}
                                  </span>
                                  {item.hasConcours ? (
                                    <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold">
                                      Concours écrit
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-bold">
                                      Sur dossier (sans concours)
                                    </span>
                                  )}
                                </div>

                                <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                                  {item.school.name}
                                </h4>

                                <p className="text-xs text-slate-500 font-medium">
                                  📍 {item.school.city}
                                </p>

                                {/* THRESHOLDS BREAKDOWN & DELTA */}
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs pt-1">
                                  {!item.isAvailable ? (
                                    <span className="text-slate-500 italic text-[11px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                      ℹ️ Seuil non disponible pour cette filière
                                    </span>
                                  ) : item.hasConcours ? (
                                    <>
                                      <span className="text-slate-600 font-medium text-[11.5px]">
                                        Seuil présélection concours :{' '}
                                        <strong className="text-slate-900 font-mono">
                                          {item.concoursThreshold?.toFixed(2)}/20
                                        </strong>
                                      </span>
                                      <span className="text-slate-300 hidden sm:inline">•</span>
                                      <span className="text-slate-600 font-medium text-[11.5px]">
                                        Admission directe :{' '}
                                        <strong className="text-slate-900 font-mono">
                                          {item.directThreshold?.toFixed(2)}/20
                                        </strong>
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-slate-600 font-medium text-[11.5px]">
                                      Seuil d’admission dossier :{' '}
                                      <strong className="text-slate-900 font-mono">
                                        {item.directThreshold?.toFixed(2)}/20
                                      </strong>
                                    </span>
                                  )}

                                  {/* ECART AVEC LE SEUIL */}
                                  {item.isAvailable && (
                                    <span className="inline-flex items-center gap-1 font-medium text-[11.5px]">
                                      <span className="text-slate-500">Écart :</span>
                                      <span className={`px-2 py-0.5 rounded font-mono text-[11px] ${deltaInfo.badgeClass}`}>
                                        {deltaInfo.text}
                                      </span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* RIGHT: BADGE + ACTION BUTTON */}
                            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                              {/* BADGES WITH THE EXACT 3 STATUTS */}
                              {item.status === 'ADMIS' && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-extrabold shadow-2xs">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                                  <span>Admis</span>
                                </span>
                              )}

                              {item.status === 'CONCOURS' && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-100 text-blue-900 border border-blue-300 text-xs font-extrabold shadow-2xs">
                                  <Award className="w-4 h-4 text-blue-700" />
                                  <span>Admis au concours</span>
                                </span>
                              )}

                              {item.status === 'NON_ADMIS' && item.isAvailable && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-100 text-rose-900 border border-rose-300 text-xs font-extrabold shadow-2xs">
                                  <XCircle className="w-4 h-4 text-rose-700" />
                                  <span>Non admis</span>
                                </span>
                              )}

                              {item.status === 'NON_ADMIS' && !item.isAvailable && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 border border-slate-300 text-xs font-semibold">
                                  <Info className="w-4 h-4 text-slate-500" />
                                  <span>Seuil non disponible</span>
                                </span>
                              )}

                              <button
                                type="button"
                                onClick={() => setSelectedSchoolIdForModal(item.school.id)}
                                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-900 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                              >
                                <span>Fiche détaillée</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2">
                        <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                        <p className="text-sm font-bold text-slate-700">
                          Aucun établissement ne correspond au filtre sélectionné
                        </p>
                        <p className="text-xs text-slate-500">
                          Essayez de sélectionner « Tous » ou de modifier votre terme de recherche.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setCalcFilter('TOUS');
                            setCalcSearch('');
                          }}
                          className="mt-2 px-3 py-1.5 bg-blue-900 text-white rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Réinitialiser les filtres
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL FICHE ECOLE */}
      {selectedSchoolIdForModal && (
        <SchoolDetailModal
          schoolId={selectedSchoolIdForModal}
          onClose={() => setSelectedSchoolIdForModal(null)}
          onPracticeQuiz={(key) => {
            setSelectedSchoolIdForModal(null);
            setQuizExamKey(key);
            navigateTo('QUIZ', 'quiz');
          }}
        />
      )}

      {/* PERSISTENT FOOTER ACROSS ALL PUBLIC SCREENS */}
      <footer className="max-w-5xl mx-auto px-4 mt-16 pt-8 border-t border-slate-200 text-center text-xs text-slate-500 font-medium space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-600">
          <button onClick={() => navigateTo('HOME', 'home')} className="hover:text-blue-900 transition cursor-pointer">
            Accueil
          </button>
          <span className="text-slate-300">•</span>
          <button onClick={() => navigateTo('CALCULATOR', 'calculator')} className="hover:text-blue-900 transition cursor-pointer">
            Calculateur
          </button>
          <span className="text-slate-300">•</span>
          <button onClick={() => navigateTo('SCHOOLS', 'schools')} className="hover:text-blue-900 transition cursor-pointer">
            Écoles
          </button>
          <span className="text-slate-300">•</span>
          <button onClick={() => navigateTo('CONCOURS', 'concours')} className="hover:text-blue-900 transition cursor-pointer">
            Concours
          </button>
          <span className="text-slate-300">•</span>
          <button onClick={() => navigateTo('GUIDES', 'guides')} className="hover:text-blue-900 transition cursor-pointer">
            Guides
          </button>
          <span className="text-slate-300">•</span>
          <button onClick={() => navigateTo('FILIERES', 'filieres')} className="hover:text-blue-900 transition cursor-pointer">
            Filières
          </button>
          <span className="text-slate-300">•</span>
          <button onClick={() => navigateTo('FAQ', 'faq')} className="hover:text-blue-900 transition cursor-pointer">
            FAQ
          </button>
          <span className="text-slate-300">•</span>
          <button onClick={() => navigateTo('ABOUT', 'about')} className="hover:text-blue-900 transition cursor-pointer">
            À propos
          </button>
          <span className="text-slate-300">•</span>
          <button onClick={() => navigateTo('PRIVACY', 'privacy')} className="hover:text-blue-900 transition cursor-pointer">
            Confidentialité
          </button>
          <span className="text-slate-300">•</span>
          <button onClick={() => navigateTo('LEGAL', 'legal')} className="hover:text-blue-900 transition cursor-pointer">
            Mentions légales
          </button>
          <span className="text-slate-300">•</span>
          <button onClick={() => navigateTo('CONTACT', 'contact')} className="hover:text-blue-900 transition cursor-pointer">
            Contact
          </button>
        </div>

        <p className="text-[11px] text-slate-500">
          🇲🇦 <strong>JAAFAR TAWJIH</strong> — Plateforme indépendante d’orientation universitaire et scolaire au Maroc.
        </p>
        <p className="text-[10.5px] text-slate-400 max-w-xl mx-auto leading-relaxed">
          Les dénominations, logos et marques cités demeurent la propriété exclusive de leurs institutions respectives.
          Les seuils et informations présentés sont indicatifs et soumis aux publications officielles ministérielles.
        </p>
      </footer>
    </div>
  );
}
