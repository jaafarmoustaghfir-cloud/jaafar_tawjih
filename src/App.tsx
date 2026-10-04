import React, { useState, useMemo, useEffect } from 'react';
import { SchoolFr, BAC_NAMES, SCHOOLS_FR, BacType, SchoolCategory } from './data/schools_fr';
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
} from 'lucide-react';

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
    const isAccepted = school.acceptedBacs.includes(type);
    if (!isAccepted) {
      return {
        status: 'NON_ELIGIBLE' as const,
        label: 'Bac non compatible',
        bgColor: 'bg-slate-100 border-slate-200',
        textColor: 'text-slate-500',
      };
    }

    const threshold = school.thresholds[type];
    if (score >= threshold) {
      return {
        status: 'ADMIS' as const,
        label: '🟢 ADMISSIBILITÉ ESTIMÉE',
        bgColor: 'bg-emerald-50 border-emerald-100',
        textColor: 'text-emerald-800',
      };
    } else {
      return {
        status: 'DIFFICILE' as const,
        label: '🔴 NON ADMISSIBLE (SOUS LE SEUIL)',
        bgColor: 'bg-slate-50 border-slate-200',
        textColor: 'text-rose-700 font-bold',
      };
    }
  };

  const bestOptions = useMemo(() => {
    if (finalScore <= 0) return [];

    const scoredSchools = liveSchools.map((school) => {
      const isAccepted = school.acceptedBacs.includes(bacType);
      const threshold = isAccepted ? school.thresholds[bacType] : 99;
      const eligibility = getSchoolEligibility(school, finalScore, bacType);
      return {
        school,
        threshold,
        eligibility,
      };
    });

    return scoredSchools
      .filter((item) => item.school.acceptedBacs.includes(bacType))
      .sort((a, b) => {
        const order = { ADMIS: 0, POSSIBLE: 1, DIFFICILE: 2, NON_ELIGIBLE: 3 };
        if (order[a.eligibility.status] !== order[b.eligibility.status]) {
          return order[a.eligibility.status] - order[b.eligibility.status];
        }
        return b.threshold - a.threshold;
      })
      .slice(0, 3)
      .map((item) => item.school);
  }, [finalScore, bacType, liveSchools]);

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
                  src="/logo.svg"
                  alt="Jaafar Tawjih Logo"
                  className="w-full h-full object-contain p-0.5 transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.endsWith('/logo.svg')) {
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
              <div className="space-y-8">
                {/* SCORE HERO CHIP */}
                <div
                  id="score-hero"
                  className="bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 p-6 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md"
                >
                  <div>
                    <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block">
                      Filière Baccalauréat
                    </span>
                    <p className="text-lg font-bold">{BAC_NAMES[bacType]}</p>
                  </div>
                  <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/20 text-center sm:text-right">
                    <span className="text-[10px] text-blue-200 block uppercase font-mono">
                      Note Moyenne Calculée
                    </span>
                    <span className="text-3xl font-extrabold font-mono text-white leading-none">
                      {finalScore.toFixed(3)}
                    </span>
                  </div>
                </div>

                {/* MANDATORY DISCLAIMER BOX */}
                <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1.5 shadow-xs">
                  <p className="font-bold text-amber-800 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                    ⚠️ Résultat indicatif :
                  </p>
                  <p className="leading-relaxed">
                    Cette estimation ne garantit pas l'admission. Les critères, seuils et capacités d'accueil peuvent varier chaque année. Vérifiez toujours les informations auprès de l'établissement concerné.
                  </p>
                </div>

                {/* BEST OPTIONS COMPILATION */}
                <section
                  id="best-options"
                  className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-bold text-sm tracking-wide uppercase">
                      👉 Meilleures options estimées pour toi
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {bestOptions.length > 0 ? (
                      bestOptions.map((school, idx) => {
                        const eligibility = getSchoolEligibility(school, finalScore, bacType);
                        return (
                          <div
                            key={school.id}
                            className="bg-slate-800/80 border border-slate-700 px-4 py-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center space-x-2.5">
                              <span className="text-emerald-400 font-mono font-bold">N°{idx + 1}</span>
                              <div>
                                <p className="font-bold text-sm text-white">{school.name}</p>
                                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[10.5px] text-slate-400 font-medium mt-0.5">
                                  <span>{school.category}</span>
                                  <span className="text-slate-600">•</span>
                                  <span>{school.city}</span>
                                  {school.acceptedBacs.includes(bacType) && (
                                    <>
                                      <span className="text-slate-600">•</span>
                                      <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-mono">
                                        Seuil indicatif : {school.thresholds[bacType]}/20
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                              <span className="font-bold uppercase tracking-wider px-2 py-1 bg-slate-950 rounded border border-slate-800 text-[10px] text-emerald-300">
                                {eligibility.label}
                              </span>
                              <button
                                onClick={() => setSelectedSchoolIdForModal(school.id)}
                                className="px-2 py-1 bg-blue-900 hover:bg-blue-800 rounded text-[10px] font-bold text-white cursor-pointer"
                              >
                                Fiche détaillée
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-xs text-slate-400 italic">Aucune école recommandée sous votre profil.</p>
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
