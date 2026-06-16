import React, { useState, useMemo } from 'react';
import { SchoolFr, BAC_NAMES, SCHOOLS_FR, BacType, SchoolCategory } from './data/schools_fr';
import {
  GraduationCap,
  Calculator,
  Sparkles,
  Search,
  Phone,
  Mail,
  X,
  Instagram
} from 'lucide-react';

const isConcoursSchool = (schoolId: string) => {
  const normalized = schoolId.toLowerCase();
  return (
    normalized === 'ensa' ||
    normalized === 'ensam' ||
    normalized === 'ensck' ||
    normalized === 'emi' ||
    normalized === 'ensias' ||
    normalized === 'ehtp' ||
    normalized === 'inpt' ||
    normalized === 'insea' ||
    normalized === 'ensmr' ||
    normalized === 'cpge' ||
    normalized === 'iav' ||
    normalized === 'enam_agri' ||
    normalized === 'ena_archi' ||
    normalized === 'ena_admin' ||
    normalized === 'era_admin' ||
    normalized === 'era_air' ||
    normalized === 'ens' ||
    normalized === 'esef' ||
    normalized === 'fmp' ||
    normalized === 'fmd' ||
    normalized === 'iscae' ||
    normalized === 'ispits' ||
    normalized === 'amdis'
  );
};

export default function App() {
  // Initial states with pre-filled values
  const [bacType, setBacType] = useState<BacType>('PC');
  const [nationalGrade, setNationalGrade] = useState<string>('14.75');
  const [regionalGrade, setRegionalGrade] = useState<string>('15.50');
  const [hasChecked, setHasChecked] = useState<boolean>(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [selectedStatus, setSelectedStatus] = useState<string>('Tous');

  // Input validation errors
  const [errors, setErrors] = useState<{ national?: string; regional?: string }>({});

  // 1. Calculate weighted final BAC score
  const finalScore = useMemo(() => {
    const nat = parseFloat(nationalGrade);
    const reg = parseFloat(regionalGrade);
    if (!isNaN(nat) && nat >= 0 && nat <= 20 && !isNaN(reg) && reg >= 0 && reg <= 20) {
      return (nat * 0.75) + (reg * 0.25);
    }
    return 0;
  }, [nationalGrade, regionalGrade]);

  // Form submit handler
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

  // 2. Compute status helper for each school
  // Statuses must be exactly:
  // 🟢 100% ADMIS
  // 🟡 POSSIBLE
  // 🔴 DIFFICILE
  const getSchoolEligibility = (school: SchoolFr, score: number, type: BacType) => {
    const isAccepted = school.acceptedBacs.includes(type);
    if (!isAccepted) {
      return {
        status: 'DIFFICILE' as const,
        label: '🔴 DIFFICILE (NON POSSIBLE)',
        bgColor: 'bg-rose-50 border-rose-100',
        textColor: 'text-rose-800'
      };
    }

    const threshold = school.thresholds[type];
    if (score >= threshold) {
      return {
        status: 'ADMIS' as const,
        label: '🟢 100% ADMIS',
        bgColor: 'bg-emerald-50 border-emerald-100',
        textColor: 'text-emerald-800'
      };
    } else {
      return {
        status: 'DIFFICILE' as const,
        label: '🔴 DIFFICILE (NON POSSIBLE)',
        bgColor: 'bg-slate-50 border-slate-200',
        textColor: 'text-rose-700 font-bold'
      };
    }
  };

  // 3. Process recommendations (top 3 best options matching profile)
  const bestOptions = useMemo(() => {
    if (finalScore <= 0) return [];

    const scoredSchools = SCHOOLS_FR.map(school => {
      const isAccepted = school.acceptedBacs.includes(bacType);
      const threshold = isAccepted ? school.thresholds[bacType] : 99;
      const eligibility = getSchoolEligibility(school, finalScore, bacType);
      return {
        school,
        threshold,
        eligibility
      };
    });

    // Sort: Admis first, then Possible, then Difficult.
    // Within each, sort by higher threshold (most matching selective) first.
    return scoredSchools
      .filter(item => item.school.acceptedBacs.includes(bacType))
      .sort((a, b) => {
        const order = { ADMIS: 0, POSSIBLE: 1, DIFFICILE: 2 };
        if (order[a.eligibility.status] !== order[b.eligibility.status]) {
          return order[a.eligibility.status] - order[b.eligibility.status];
        }
        return b.threshold - a.threshold;
      })
      .slice(0, 3)
      .map(item => item.school);
  }, [finalScore, bacType]);

  // 4. Combined Filtering logic for all schools
  const filteredSchools = useMemo(() => {
    return SCHOOLS_FR.filter(school => {
      // Search
      const textToSearch = `${school.name} ${school.city} ${school.category}`.toLowerCase();
      if (searchQuery && !textToSearch.includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category
      if (selectedCategory !== 'Toutes' && school.category !== selectedCategory) {
        return false;
      }

      // Status
      if (selectedStatus !== 'Tous') {
        const eligibility = getSchoolEligibility(school, finalScore, bacType);
        if (selectedStatus === 'ADMIS' && eligibility.status !== 'ADMIS') return false;
        if (selectedStatus === 'DIFFICILE' && eligibility.status !== 'DIFFICILE') return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedStatus, finalScore, bacType]);

  // Unique list of categories present
  const categoriesList: SchoolCategory[] = [
    'Ingénierie / Sciences',
    'Commerce / Gestion',
    'Administration',
    'Formation / Enseignement',
    'Santé / Paramédical',
    'Militaire / Sécurité',
    'Formation Professionnelle',
    'Universités Privées',
    'Spécial Concours'
  ];

  return (
    <div 
      className="min-h-screen text-slate-800 font-sans antialiased pb-16 selection:bg-blue-600 selection:text-white"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(248, 250, 252, 0.93), rgba(243, 244, 246, 0.97)), url('https://i.imgur.com/U1DfuZr.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      
      {/* HEADER BANNER */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/50 py-6 sm:py-8 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4 animate-fade-in flex flex-col items-center">
          
          {/* Logo container with stylized vector avatar / logo */}
          <div className="relative group">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-600 via-emerald-500 to-purple-600 opacity-75 blur-md group-hover:opacity-100 transition duration-300"></div>
            <div className="relative">
              <img
                src="https://i.imgur.com/UWxSMXu.png"
                alt="Jaafar'Stawjih Logo"
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-xl object-cover bg-white"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to high quality design icon if imgur direct link fails
                  e.currentTarget.style.display = 'none';
                  const fb = document.getElementById('logo-fallback');
                  if (fb) fb.className = "w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-xl bg-gradient-to-tr from-blue-600 to-purple-700 flex items-center justify-center text-white";
                }}
              />
              <div 
                id="logo-fallback"
                className="hidden"
              >
                <GraduationCap className="w-14 h-14" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-1.5 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 text-blue-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span className="text-[10px] tracking-wide uppercase">Plateforme d’Orientation Post-BAC Maroc 2026</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            
            <h1 id="app-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-indigo-805 to-purple-800 bg-clip-text text-transparent">
              Jaafar’Stawjih
            </h1>
            
            <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed font-medium">
              Trouvez instantanément votre admissibilité dans les grandes écoles supérieures marocaines selon votre moyenne.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <a 
                href="https://www.instagram.com/jaafar_tawjih?igsh=a2Qwem1scWE0MjZz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 text-[11px] font-bold border border-pink-100 transition duration-150 shadow-sm"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span>Instagram : @jaafar_tawjih</span>
              </a>
              <a 
                href="https://wa.me/212772908456"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold border border-emerald-100 transition duration-150 shadow-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current text-emerald-600" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 1.966 14.113 1.01 11.49 1.01c-5.436 0-9.86 4.37-9.864 9.8 0 1.745.474 3.454 1.374 4.952l-1.002 3.66 3.75-.983zm11.215-3.56c-.27-.135-1.602-.79-1.85-.88-.25-.09-.432-.135-.615.135-.183.27-.71.88-.87 1.065-.16.185-.32.207-.59.072-.27-.135-1.143-.421-2.177-1.344-.805-.718-1.349-1.605-1.507-1.875-.16-.27-.015-.417.12-.551.123-.122.27-.315.405-.472.135-.157.18-.27.27-.45.09-.18.045-.337-.022-.472-.067-.135-.615-1.485-.84-2.03-.22-.53-.442-.457-.615-.466-.16-.007-.343-.01-.525-.01-.18 0-.473.067-.72.337-.248.27-.945.922-.945 2.25 0 1.328.967 2.61 1.102 2.79.135.18 1.902 2.904 4.61 4.07.645.278 1.148.441 1.54.566.65.206 1.24.177 1.706.108.52-.077 1.602-.656 1.83-1.258.226-.6.226-1.12.16-1.228-.067-.108-.25-.153-.52-.287z"/>
                </svg>
                <span>WhatsApp Assistance</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* CORE FRAMEWORK */}
      <main className="max-w-3xl mx-auto px-4 mt-8 space-y-8">

        {/* INPUT PANEL CARD */}
        <section id="calcule-card" className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-950 px-6 py-4.5 text-white flex items-center justify-between">
            <h2 className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              Calculateur de Score
            </h2>
            <span className="text-[10px] font-bold font-mono text-emerald-300 bg-blue-950/60 border border-blue-800/40 px-2.5 py-0.5 rounded">
              75% National + 25% Régional
            </span>
          </div>

          <form onSubmit={handleVerify} className="p-6 space-y-6">
            
            {/* Bac stream buttons */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                Filière de votre Baccalauréat
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
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
                      <span className="text-[9px] text-slate-450 block truncate font-normal">{BAC_NAMES[type].split(' (')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input fields */}
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

            {/* Action Verify */}
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
            <div id="score-hero" className="bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 p-6 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
              <div>
                <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block">Filière Baccalauréat</span>
                <p className="text-lg font-bold">{BAC_NAMES[bacType]}</p>
              </div>
              <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/20 text-center sm:text-right">
                <span className="text-[10px] text-blue-200 block uppercase font-mono">Note Moyenne Calculée</span>
                <span className="text-3xl font-extrabold font-mono text-white leading-none">{finalScore.toFixed(3)}</span>
              </div>
            </div>

            {/* BONUS FEATURE: BEST OPTIONS COMPILATION */}
            <section id="best-options" className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm tracking-wide uppercase">👉 Meilleures options pour toi</h3>
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
                            <p className="text-[10px] text-slate-400 font-medium">{school.category} • {school.city}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                          <span className="font-bold uppercase tracking-wider px-2 py-1 bg-slate-950 rounded border border-slate-800 text-[10px] text-emerald-300">
                            {eligibility.label}
                          </span>
                          {isConcoursSchool(school.id) && eligibility.status === 'ADMIS' && (
                            <span className="font-bold uppercase tracking-wider px-2 py-1 bg-blue-950 border border-blue-900 rounded text-[10px] text-blue-300">
                              🎓 ADMIS POUR PASSER LE CONCOURS
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-400 italic">Aucune école recommandée sous votre profil.</p>
                )}
              </div>
            </section>

            {/* DETAILED SCHOOL DIRECTORY INDEX */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="font-extrabold text-lg text-slate-900 tracking-tight">
                  🏫 Éligibilité par Établissement
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {filteredSchools.length} écoles répertoriées
                </span>
              </div>

              {/* DYNAMIC INTERFACE SEARCH & FILTER BAR */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
                
                {/* Text filter row */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une école par nom ou ville..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/15"
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

                {/* Dropdowns filters */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Category Filter */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Secteur</span>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-slate-700 font-semibold cursor-pointer"
                    >
                      <option value="Toutes">Tous les secteurs</option>
                      {categoriesList.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Status filter */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Admissibilité</span>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-slate-700 font-semibold cursor-pointer"
                    >
                      <option value="Tous">Tous les statuts</option>
                      <option value="ADMIS">🟢 100% ADMIS</option>
                      <option value="DIFFICILE">🔴 DIFFICILE</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* LIST OF TARGET SCHOOLS WITH STRICT FORMATTING RULE */}
              {/* Show ONLY Status, NO explanations, NO paragraphs. Format ONLY: School Name — Status */}
              <div className="space-y-2">
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((school) => {
                    const eligibility = getSchoolEligibility(school, finalScore, bacType);
                    return (
                      <div
                        key={school.id}
                        className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        {/* School Name — Status formatting representation in elegant design */}
                        <div className="flex-1 min-w-0 pr-2">
                          <p className="font-bold text-slate-900">
                            {school.name}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {school.category} • {school.city}
                          </p>
                        </div>
                        <div className="shrink-0 flex flex-wrap items-center gap-1.5">
                          <span className="text-slate-400 font-light hidden sm:inline">—</span>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${eligibility.bgColor} ${eligibility.textColor} border shrink-0`}>
                              {eligibility.label}
                            </span>
                            {isConcoursSchool(school.id) && eligibility.status === 'ADMIS' && (
                              <span className="px-2.5 py-1.5 bg-blue-50 text-blue-800 border border-blue-100 rounded-lg text-[10px] font-bold shrink-0">
                                🎓 ADMIS POUR PASSER LE CONCOURS
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center p-8 bg-white border border-slate-200 rounded-xl">
                    <p className="text-xs font-semibold text-slate-600">Aucun établissement ne correspond aux filtres choisis.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('Toutes');
                        setSelectedStatus('Tous');
                        setSearchQuery('');
                      }}
                      className="text-xs text-emerald-600 font-bold underline mt-1.5"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* CONTACT US SECTION */}
        <section id="contact-us" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Visual Banner illustrating the platform */}
          <div className="w-full h-44 sm:h-52 overflow-hidden relative">
            <img 
              src="https://i.imgur.com/U1DfuZr.png" 
              alt="Jaafar'Stawjih Assistance"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          </div>

          <div className="p-6 space-y-4 pt-2">
            <div className="text-center space-y-1">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900">
                Contactez-nous
              </h3>
              <p className="text-xs text-slate-500">
                Pour toute demande d’aide ou d’inscription dans une école, contactez-nous directement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <a
                href="https://wa.me/212772908456"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition duration-150 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current mr-1" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 1.966 14.113 1.01 11.49 1.01c-5.436 0-9.86 4.37-9.864 9.8 0 1.745.474 3.454 1.374 4.952l-1.002 3.66 3.75-.983zm11.215-3.56c-.27-.135-1.602-.79-1.85-.88-.25-.09-.432-.135-.615.135-.183.27-.71.88-.87 1.065-.16.185-.32.207-.59.072-.27-.135-1.143-.421-2.177-1.344-.805-.718-1.349-1.605-1.507-1.875-.16-.27-.015-.417.12-.551.123-.122.27-.315.405-.472.135-.157.18-.27.27-.45.09-.18.045-.337-.022-.472-.067-.135-.615-1.485-.84-2.03-.22-.53-.442-.457-.615-.466-.16-.007-.343-.01-.525-.01-.18 0-.473.067-.72.337-.248.27-.945.922-.945 2.25 0 1.328.967 2.61 1.102 2.79.135.18 1.902 2.904 4.61 4.07.645.278 1.148.441 1.54.566.65.206 1.24.177 1.706.108.52-.077 1.602-.656 1.83-1.258.226-.6.226-1.12.16-1.228-.067-.108-.25-.153-.52-.287z"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              <a
                href="https://www.instagram.com/jaafar_tawjih?igsh=a2Qwem1scWE0MjZz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-sm transition duration-150 cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-white" />
                <span>Instagram</span>
              </a>

              <a
                href="mailto:jaafarmoustaghfir@gmail.com"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition duration-150 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Envoyer un email</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER FOOTPRINT */}
      <footer className="max-w-3xl mx-auto px-4 mt-12 py-6 border-t border-slate-200 text-center text-[10px] text-slate-400 font-medium space-y-1">
        <p>🇲🇦 Jaafar’Stawjih — Guide d’orientation marocain.</p>
        <p>Les désignations appartiennent exclusivement aux établissements concernés.</p>
      </footer>
    </div>
  );
}
