import React, { useState, useEffect } from 'react';
import { 
  db 
} from '../firebase';
import { handleFirestoreError, OperationType } from '../firebaseErrors';
import medecineExamRaw from '../data/medecine_2025_exam.json';
import ensaExamRaw from '../data/ensa_2024_exam.json';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  ShieldCheck, 
  LogOut, 
  School, 
  Users, 
  BarChart3, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Sparkles,
  ArrowRight,
  Filter,
  RefreshCw,
  Search,
  BookOpen,
  FileQuestion,
  Layers
} from 'lucide-react';

interface EcoleDoc {
  id?: string;
  nom: string;
  filiere_requise: string;
  seuil_preselection: number;
  annee: string;
  formule: string;
}

interface QuestionSessionItem {
  question_id: number;
  reponse_donnee: string;
  correcte: boolean;
  temps_passe?: number;
}

interface SessionQcmDoc {
  id: string;
  nom_utilisateur: string;
  concours: string;
  annee: string;
  date?: any;
  score_total: number;
  reponses: QuestionSessionItem[];
}

interface QcmQuestionItem {
  id: number;
  enonce: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    E?: string;
  };
  reponse: string;
  explication?: string;
}

interface QcmDoc {
  id?: string;
  concours: string;
  annee: string;
  matiere: string;
  questions: QcmQuestionItem[];
}

interface AdminPortalProps {
  onNavigateHome?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onNavigateHome }) => {
  // Local admin authentication state (persisted across page reloads via localStorage)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jaafar_admin_auth') === 'true';
    }
    return false;
  });

  // Login form state
  const [usernameInput, setUsernameInput] = useState<string>('jaafar');
  const [passwordInput, setPasswordInput] = useState<string>('2008');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState<boolean>(false);

  // Navigation tabs
  const [activeAdminTab, setActiveAdminTab] = useState<'ECOLES' | 'USERS' | 'ERRORS' | 'QCM'>('ECOLES');

  // QCM state
  const [qcmList, setQcmList] = useState<QcmDoc[]>([]);
  const [loadingQcm, setLoadingQcm] = useState<boolean>(false);
  const [selectedQcmForView, setSelectedQcmForView] = useState<QcmDoc | null>(null);
  const [isSeedingQcm, setIsSeedingQcm] = useState<boolean>(false);
  const [qcmConcoursInput, setQcmConcoursInput] = useState<string>('Médecine');
  const [qcmAnneeInput, setQcmAnneeInput] = useState<string>('2025');
  const [qcmMatiereInput, setQcmMatiereInput] = useState<string>('Sciences de la Vie');
  const [qcmEnonceInput, setQcmEnonceInput] = useState<string>('');
  const [qcmOptA, setQcmOptA] = useState<string>('');
  const [qcmOptB, setQcmOptB] = useState<string>('');
  const [qcmOptC, setQcmOptC] = useState<string>('');
  const [qcmOptD, setQcmOptD] = useState<string>('');
  const [qcmOptE, setQcmOptE] = useState<string>('');
  const [qcmReponseInput, setQcmReponseInput] = useState<string>('A');
  const [qcmExplicationInput, setQcmExplicationInput] = useState<string>('');

  // Ecoles state
  const [ecoles, setEcoles] = useState<EcoleDoc[]>([]);
  const [loadingEcoles, setLoadingEcoles] = useState<boolean>(false);
  const [editingEcoleId, setEditingEcoleId] = useState<string | null>(null);
  const [nomInput, setNomInput] = useState('');
  const [filiereInput, setFiliereInput] = useState('');
  const [seuilInput, setSeuilInput] = useState<string>('14.50');
  const [anneeInput, setAnneeInput] = useState('2024');
  const [formuleInput, setFormuleInput] = useState('75_25');

  // Sessions state
  const [sessions, setSessions] = useState<SessionQcmDoc[]>([]);
  const [loadingSessions, setLoadingSessions] = useState<boolean>(false);
  const [filterConcours, setFilterConcours] = useState<string>('ALL');
  const [filterAnnee, setFilterAnnee] = useState<string>('ALL');
  const [selectedSessionForModal, setSelectedSessionForModal] = useState<SessionQcmDoc | null>(null);
  const [rulesNotice, setRulesNotice] = useState<string | null>(null);

  // Load Firestore data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchEcoles();
      fetchSessions();
      fetchQcm();
    }
  }, [isAuthenticated]);

  // Fetch Ecoles from Firestore
  const fetchEcoles = async () => {
    setLoadingEcoles(true);
    try {
      const snap = await getDocs(collection(db, 'ecoles'));
      const list: EcoleDoc[] = [];
      snap.forEach((d) => {
        list.push({ id: d.id, ...(d.data() as Omit<EcoleDoc, 'id'>) });
      });
      setEcoles(list);
      setRulesNotice(null);
    } catch (err: any) {
      handleFirestoreError(err, OperationType.LIST, 'ecoles');
      if (err?.message?.includes('permission') || err?.code === 'permission-denied') {
        setRulesNotice("تنبيه أمان Firestore: قاعدة البيانات تمنع الوصول. المرجو التأكد من نشر القواعد الموجودة في ملف firestore.rules عبر Firebase Console > Firestore Database > Rules.");
      }
    } finally {
      setLoadingEcoles(false);
    }
  };

  // Fetch Sessions from Firestore
  const fetchSessions = async () => {
    setLoadingSessions(true);
    try {
      const snap = await getDocs(collection(db, 'sessions_qcm'));
      const list: SessionQcmDoc[] = [];
      snap.forEach((d) => {
        list.push({ id: d.id, ...(d.data() as Omit<SessionQcmDoc, 'id'>) });
      });
      // Sort by score descending
      list.sort((a, b) => (b.score_total || 0) - (a.score_total || 0));
      setSessions(list);
    } catch (err: any) {
      handleFirestoreError(err, OperationType.LIST, 'sessions_qcm');
      if (err?.message?.includes('permission') || err?.code === 'permission-denied') {
        setRulesNotice("تنبيه أمان Firestore: قاعدة البيانات تمنع الوصول. المرجو التأكد من نشر القواعد الموجودة في ملف firestore.rules عبر Firebase Console > Firestore Database > Rules.");
      }
    } finally {
      setLoadingSessions(false);
    }
  };

  // Fetch QCM packs from Firestore
  const fetchQcm = async () => {
    setLoadingQcm(true);
    try {
      const snap = await getDocs(collection(db, 'qcm'));
      const list: QcmDoc[] = [];
      snap.forEach((d) => {
        list.push({ id: d.id, ...(d.data() as Omit<QcmDoc, 'id'>) });
      });
      setQcmList(list);
    } catch (err: any) {
      handleFirestoreError(err, OperationType.LIST, 'qcm');
      if (err?.message?.includes('permission') || err?.code === 'permission-denied') {
        setRulesNotice("تنبيه أمان Firestore: قاعدة البيانات تمنع الوصول. المرجو التأكد من نشر القواعد الموجودة في ملف firestore.rules.");
      }
    } finally {
      setLoadingQcm(false);
    }
  };

  // Seed default exams into Firestore collection qcm
  const handleSeedDefaultQcm = async () => {
    if (!confirm('هل تريد استيراد بنك أسئلة المباريات (Médecine 2025 & ENSA 2024) إلى Firestore مباشرة؟')) return;
    setIsSeedingQcm(true);
    try {
      // 1. Seed Medecine 2025 by section
      const medSections: Record<string, QcmQuestionItem[]> = {};
      medecineExamRaw.questions.forEach((q) => {
        if (!medSections[q.section]) medSections[q.section] = [];
        medSections[q.section].push({
          id: q.id,
          enonce: q.question,
          options: {
            A: q.options?.A || '',
            B: q.options?.B || '',
            C: q.options?.C || '',
            D: q.options?.D || '',
            E: q.options?.E || '',
          },
          reponse: q.correct_answer || 'A',
          explication: (q as any).explication || '',
        });
      });

      for (const [secName, qList] of Object.entries(medSections)) {
        await addDoc(collection(db, 'qcm'), {
          concours: 'Médecine',
          annee: '2025',
          matiere: secName,
          questions: qList,
          createdAt: serverTimestamp(),
        });
      }

      // 2. Seed ENSA 2024 by section
      const ensaSections: Record<string, QcmQuestionItem[]> = {};
      ensaExamRaw.questions.forEach((q: any) => {
        if (!ensaSections[q.section]) ensaSections[q.section] = [];
        ensaSections[q.section].push({
          id: q.id,
          enonce: q.question,
          options: {
            A: q.options?.A || '',
            B: q.options?.B || '',
            C: q.options?.C || '',
            D: q.options?.D || '',
            E: q.options?.E || '',
          },
          reponse: q.correct_answer || 'A',
          explication: (q as any).explication || '',
        });
      });

      for (const [secName, qList] of Object.entries(ensaSections)) {
        await addDoc(collection(db, 'qcm'), {
          concours: 'ENSA',
          annee: '2024',
          matiere: secName,
          questions: qList,
          createdAt: serverTimestamp(),
        });
      }

      alert('تم استيراد بنك الأسئلة بنجاح إلى Firestore!');
      fetchQcm();
    } catch (err: any) {
      alert(`خطأ أثناء رفع الأسئلة: ${err.message}`);
    } finally {
      setIsSeedingQcm(false);
    }
  };

  // Delete QCM pack
  const handleDeleteQcm = async (id?: string) => {
    if (!id) return;
    if (confirm('هل أنت متأكد من حذف هذه المجموعة من الأسئلة من Firestore؟')) {
      try {
        await deleteDoc(doc(db, 'qcm', id));
        fetchQcm();
      } catch (err: any) {
        alert(`Erreur: ${err.message}`);
      }
    }
  };

  // Add custom question/pack to Firestore
  const handleCreateQcmQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qcmEnonceInput || !qcmOptA || !qcmOptB) {
      alert('يرجى ملء نص السؤال والخيارين A و B على الأقل.');
      return;
    }

    try {
      const newQuestion: QcmQuestionItem = {
        id: Date.now(),
        enonce: qcmEnonceInput,
        options: {
          A: qcmOptA,
          B: qcmOptB,
          C: qcmOptC,
          D: qcmOptD,
          ...(qcmOptE ? { E: qcmOptE } : {}),
        },
        reponse: qcmReponseInput,
        explication: qcmExplicationInput,
      };

      await addDoc(collection(db, 'qcm'), {
        concours: qcmConcoursInput,
        annee: qcmAnneeInput,
        matiere: qcmMatiereInput,
        questions: [newQuestion],
        createdAt: serverTimestamp(),
      });

      setQcmEnonceInput('');
      setQcmOptA('');
      setQcmOptB('');
      setQcmOptC('');
      setQcmOptD('');
      setQcmOptE('');
      setQcmExplicationInput('');
      alert('تمت إضافة السؤال بنجاح إلى collection "qcm" في Firestore!');
      fetchQcm();
    } catch (err: any) {
      alert(`خطأ في الإضافة: ${err.message}`);
    }
  };

  // Login handler: purely local verification with username "jaafar" and password "2008"
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsSubmittingAuth(true);

    const user = usernameInput.trim();
    const pass = passwordInput.trim();

    if (user === 'jaafar' && pass === '2008') {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('jaafar_admin_auth', 'true');
      }
      setIsSubmittingAuth(false);
    } else {
      setIsSubmittingAuth(false);
      setAuthError('اسم المستخدم أو كلمة المرور غير صحيحة. يرجى التأكد من إدخال jaafar و 2008.');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jaafar_admin_auth');
    }
    setPasswordInput('');
    setAuthError(null);
  };

  // Save or Update Ecole
  const handleSaveEcole = async (e: React.FormEvent) => {
    e.preventDefault();
    const seuilNum = parseFloat(seuilInput);
    if (!nomInput || isNaN(seuilNum)) return;

    try {
      if (editingEcoleId) {
        await updateDoc(doc(db, 'ecoles', editingEcoleId), {
          nom: nomInput,
          filiere_requise: filiereInput,
          seuil_preselection: seuilNum,
          annee: anneeInput,
          formule: formuleInput,
        });
      } else {
        await addDoc(collection(db, 'ecoles'), {
          nom: nomInput,
          filiere_requise: filiereInput,
          seuil_preselection: seuilNum,
          annee: anneeInput,
          formule: formuleInput,
          createdAt: serverTimestamp(),
        });
      }
      // Reset form
      setEditingEcoleId(null);
      setNomInput('');
      setFiliereInput('');
      setSeuilInput('14.50');
      fetchEcoles();
    } catch (err: any) {
      alert(`Erreur d'enregistrement: ${err.message}`);
    }
  };

  const handleEditEcole = (item: EcoleDoc) => {
    if (!item.id) return;
    setEditingEcoleId(item.id);
    setNomInput(item.nom);
    setFiliereInput(item.filiere_requise);
    setSeuilInput(item.seuil_preselection.toString());
    setAnneeInput(item.annee);
    setFormuleInput(item.formule);
  };

  const handleDeleteEcole = async (id?: string) => {
    if (!id) return;
    if (confirm('Êtes-vous sûr de vouloir supprimer cette école de Firestore ?')) {
      try {
        await deleteDoc(doc(db, 'ecoles', id));
        fetchEcoles();
      } catch (err: any) {
        alert(`Erreur: ${err.message}`);
      }
    }
  };

  // Filtered sessions
  const filteredSessions = sessions.filter((s) => {
    const matchConcours = filterConcours === 'ALL' || s.concours === filterConcours;
    const matchAnnee = filterAnnee === 'ALL' || s.annee === filterAnnee;
    return matchConcours && matchAnnee;
  });

  // Calculate question error rates
  const questionAnalytics = React.useMemo(() => {
    const stats: Record<string, { totalTries: number; wrongTries: number; questionId: number; concours: string; annee: string }> = {};

    sessions.forEach((s) => {
      if (Array.isArray(s.reponses)) {
        s.reponses.forEach((r) => {
          const key = `${s.concours}_${s.annee}_Q${r.question_id}`;
          if (!stats[key]) {
            stats[key] = {
              totalTries: 0,
              wrongTries: 0,
              questionId: r.question_id,
              concours: s.concours,
              annee: s.annee,
            };
          }
          stats[key].totalTries += 1;
          if (!r.correcte) {
            stats[key].wrongTries += 1;
          }
        });
      }
    });

    const items = Object.values(stats).map((item) => {
      const errorRate = item.totalTries > 0 ? Math.round((item.wrongTries / item.totalTries) * 100) : 0;
      return {
        ...item,
        errorRate,
      };
    });

    // Sort by error rate descending
    items.sort((a, b) => b.errorRate - a.errorRate);
    return items;
  }, [sessions]);

  // --- LOGIN SCREEN (Local verification jaafar / 2008) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-cyan-500 selection:text-black">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-600"></div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">بوابة الإدارة المركزية</h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">jaafartawjih.netlify.app — Route /admin</p>
          </div>

          {authError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                الاسم المستعمل للدخول
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="jaafar"
                required
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                كود الدخول (Mot de passe)
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="2008"
                required
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingAuth}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-500/20 transition active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              {isSubmittingAuth ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>جاري التحقق...</span>
                </>
              ) : (
                <>
                  <span>تسجيل الدخول إلى البوابة</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500 font-mono">
              بوابة الإدارة المركزية — jaafartawjih.netlify.app
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- AUTHENTICATED ADMIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Admin Header with greeting: مرحبا بيك jaafar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-500 flex items-center justify-center text-slate-950 font-black shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base">JAAFAR TAWJIH</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono font-bold">
                  ADMIN
                </span>
              </div>
              <p className="text-xs text-emerald-400 font-bold">
                مرحبا بيك jaafar 👋
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => {
                if (onNavigateHome) {
                  e.preventDefault();
                  onNavigateHome();
                }
              }}
              className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 transition"
            >
              الذهاب للموقع العمومي
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 text-xs font-bold transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>خروج</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Firestore Security Rules Alert Banner */}
        {rulesNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-300 text-xs leading-relaxed">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold mb-1">تنبيه صلاحيات Firebase Firestore:</p>
              <p>{rulesNotice}</p>
              <div className="mt-2 text-[11px] text-amber-200/80 font-mono bg-amber-950/40 p-2.5 rounded-lg border border-amber-500/20">
                القواعد جاهزة في ملف <strong>firestore.rules</strong>: انسخ المحتوى والصقه في 
                Firebase Console &gt; Build &gt; Firestore Database &gt; Rules ثم اضغط <strong>Publish</strong>.
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveAdminTab('ECOLES')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
              activeAdminTab === 'ECOLES'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <School className="w-4 h-4" />
            <span>إدارة المدارس والعتبات (ecoles)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950/40 font-mono">
              {ecoles.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminTab('USERS')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
              activeAdminTab === 'USERS'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>لائحة المستخدمين والترتيب (Classement)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950/40 font-mono">
              {sessions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminTab('ERRORS')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
              activeAdminTab === 'ERRORS'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>تحليل الأخطاء والأسئلة الأصعب</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950/40 font-mono">
              {questionAnalytics.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminTab('QCM')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
              activeAdminTab === 'QCM'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>بنك أسئلة المباريات (qcm)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950/40 font-mono">
              {qcmList.length}
            </span>
          </button>
        </div>

        {/* TAB 1: ECOLES & SEUILS */}
        {activeAdminTab === 'ECOLES' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-fit shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-cyan-400" />
                  <span>{editingEcoleId ? 'تعديل بيانات المدرسة' : 'إضافة مدرسة / عتبة جديدة'}</span>
                </h2>
                {editingEcoleId && (
                  <button
                    onClick={() => {
                      setEditingEcoleId(null);
                      setNomInput('');
                      setFiliereInput('');
                      setSeuilInput('14.50');
                    }}
                    className="text-[11px] text-slate-400 hover:text-white underline"
                  >
                    إلغاء
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveEcole} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">اسم المؤسسة (Nom)</label>
                  <input
                    type="text"
                    value={nomInput}
                    onChange={(e) => setNomInput(e.target.value)}
                    placeholder="مثال: ENSA Marrakech"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">الشعب المقبولة (Filières)</label>
                  <input
                    type="text"
                    value={filiereInput}
                    onChange={(e) => setFiliereInput(e.target.value)}
                    placeholder="مثال: Sciences Maths, PC, SVT"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">عتبة الانتقاء (Seuil)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={seuilInput}
                      onChange={(e) => setSeuilInput(e.target.value)}
                      placeholder="14.50"
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">السنة (Année)</label>
                    <input
                      type="text"
                      value={anneeInput}
                      onChange={(e) => setAnneeInput(e.target.value)}
                      placeholder="2024"
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">صيغة الحساب (Formule)</label>
                  <select
                    value={formuleInput}
                    onChange={(e) => setFormuleInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="75_25">75% وطني + 25% جهوي</option>
                    <option value="100_NAT">100% الامتحان الوطني</option>
                    <option value="50_50">50% وطني + 50% جهوي</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition cursor-pointer mt-2 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>{editingEcoleId ? 'حفظ التعديلات فـ Firestore' : 'إضافة المدرسة إلى Firestore'}</span>
                </button>
              </form>
            </div>

            {/* List Column */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <School className="w-5 h-5 text-cyan-400" />
                  <span>المدارس المسجلة في Firestore ({ecoles.length})</span>
                </h2>
                <button
                  onClick={fetchEcoles}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-800"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>تحديث</span>
                </button>
              </div>

              {loadingEcoles ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-cyan-400 mb-2" />
                  جاري جلب المدارس من Firestore...
                </div>
              ) : ecoles.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  لا توجد مدارس في collection "ecoles" بعد. قم بإضافة مدرسة من النموذج على اليسار!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-3">المؤسسة</th>
                        <th className="p-3">الشعب</th>
                        <th className="p-3">العتبة</th>
                        <th className="p-3">السنة</th>
                        <th className="p-3 text-center">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-slate-300">
                      {ecoles.map((ec) => (
                        <tr key={ec.id} className="hover:bg-slate-800/40 transition">
                          <td className="p-3 font-bold text-white">{ec.nom}</td>
                          <td className="p-3 text-slate-400">{ec.filiere_requise}</td>
                          <td className="p-3 text-emerald-400 font-mono font-bold">{ec.seuil_preselection}/20</td>
                          <td className="p-3 font-mono">{ec.annee}</td>
                          <td className="p-3 text-center space-x-2">
                            <button
                              onClick={() => handleEditEcole(ec)}
                              className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded hover:bg-cyan-500/20 font-semibold"
                            >
                              تعديل
                            </button>
                            <button
                              onClick={() => handleDeleteEcole(ec.id)}
                              className="px-2 py-1 bg-rose-500/10 text-rose-400 rounded hover:bg-rose-500/20 font-semibold"
                            >
                              حذف
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: USERS & CLASSEMENT */}
        {activeAdminTab === 'USERS' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span>ترتيب ونتائج التلاميذ (Sessions QCM)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  جميع التلاميذ الذين اجتازوا الاختبار مع تسجيل أسمائهم في collection "sessions_qcm".
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3">
                <select
                  value={filterConcours}
                  onChange={(e) => setFilterConcours(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white outline-none"
                >
                  <option value="ALL">جميع المباريات</option>
                  <option value="ENSA">ENSA</option>
                  <option value="Médecine">Médecine</option>
                </select>

                <select
                  value={filterAnnee}
                  onChange={(e) => setFilterAnnee(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white outline-none"
                >
                  <option value="ALL">جميع السنوات</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>

                <button
                  onClick={fetchSessions}
                  className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {loadingSessions ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-cyan-400 mb-2" />
                جاري تحميل النتائج والترتيب من Firestore...
              </div>
            ) : filteredSessions.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                لا توجد جلسات مسجلة بهذه الفلاتر حتى الآن.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">الرتبة</th>
                      <th className="p-3">اسم التلميذ</th>
                      <th className="p-3">المباراة</th>
                      <th className="p-3">السنة</th>
                      <th className="p-3">النقطة المحصلة</th>
                      <th className="p-3 text-center">التفاصيل والأخطاء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {filteredSessions.map((s, idx) => (
                      <tr key={s.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-3 font-mono font-bold text-slate-400">
                          {idx === 0 ? '🥇 #1' : idx === 1 ? '🥈 #2' : idx === 2 ? '🥉 #3' : `#${idx + 1}`}
                        </td>
                        <td className="p-3 font-bold text-white">{s.nom_utilisateur || 'تلميذ مجهول'}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px]">
                            {s.concours}
                          </span>
                        </td>
                        <td className="p-3 font-mono">{s.annee}</td>
                        <td className="p-3 font-mono font-bold text-emerald-400 text-sm">
                          {s.score_total} نقطة
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setSelectedSessionForModal(s)}
                            className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-bold text-[11px] transition cursor-pointer"
                          >
                            عرض الأخطاء بالتفصيل
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ERRORS & ANALYTICS */}
        {activeAdminTab === 'ERRORS' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                <span>تحليل أصعب الأسئلة ونسبة الخطأ فيها</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                ترتيب تنازلي للأسئلة التي يرتكب فيها التلاميذ أكبر عدد من الأخطاء لمساعدتك على معرفة نقاط الضعف.
              </p>
            </div>

            {questionAnalytics.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                لا تتوفر إحصائيات بعد. ستبدأ بالظهور فور اجتياز التلاميذ للاختبارات وتسجيل الجلسات.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {questionAnalytics.map((item) => (
                  <div key={`${item.concours}_${item.annee}_${item.questionId}`} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">
                        السؤال #{item.questionId} ({item.concours})
                      </span>
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                        item.errorRate >= 50 ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {item.errorRate}% أخطاء
                      </span>
                    </div>

                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.errorRate >= 50 ? 'bg-rose-500' : 'bg-amber-500'}`}
                        style={{ width: `${item.errorRate}%` }}
                      ></div>
                    </div>

                    <div className="text-[11px] text-slate-400 flex justify-between pt-1">
                      <span>إجمالي المحاولات: {item.totalTries}</span>
                      <span className="text-rose-400 font-semibold">{item.wrongTries} إجابة خاطئة</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: QCM QUESTIONS MANAGEMENT */}
        {activeAdminTab === 'QCM' && (
          <div className="space-y-6">
            {/* Quick Seed Action Banner */}
            <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">إدارة وتوسيع بنك الأسئلة (Collection: qcm)</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    يمكنك إضافة أسئلة جديدة أو استيراد نماذج المباريات الجاهزة مباشرة إلى قاعدة بيانات Firestore.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleSeedDefaultQcm}
                  disabled={isSeedingQcm}
                  className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                >
                  {isSeedingQcm ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Layers className="w-4 h-4" />
                  )}
                  <span>استيراد نماذج المباريات إلى Firestore</span>
                </button>

                <button
                  onClick={fetchQcm}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
                  title="تحديث"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Column: Add QCM Question */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-fit shadow-xl">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                  <Plus className="w-4 h-4 text-cyan-400" />
                  <span>إضافة سؤال جديد إلى Firestore</span>
                </h3>

                <form onSubmit={handleCreateQcmQuestion} className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">المباراة (Concours)</label>
                      <input
                        type="text"
                        value={qcmConcoursInput}
                        onChange={(e) => setQcmConcoursInput(e.target.value)}
                        placeholder="Médecine أو ENSA"
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">السنة (Année)</label>
                      <input
                        type="text"
                        value={qcmAnneeInput}
                        onChange={(e) => setQcmAnneeInput(e.target.value)}
                        placeholder="2025"
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">المادة (Matière)</label>
                    <input
                      type="text"
                      value={qcmMatiereInput}
                      onChange={(e) => setQcmMatiereInput(e.target.value)}
                      placeholder="Sciences de la Vie, Physique, etc."
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">نص السؤال (Énoncé)</label>
                    <textarea
                      value={qcmEnonceInput}
                      onChange={(e) => setQcmEnonceInput(e.target.value)}
                      placeholder="اكتب نص السؤال هنا..."
                      required
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-2 pt-1">
                    <label className="block font-semibold text-slate-300">الخيارات المقترحة (Options):</label>
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono text-cyan-400 w-4">A:</span>
                      <input
                        type="text"
                        value={qcmOptA}
                        onChange={(e) => setQcmOptA(e.target.value)}
                        placeholder="الخيار A"
                        required
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono text-cyan-400 w-4">B:</span>
                      <input
                        type="text"
                        value={qcmOptB}
                        onChange={(e) => setQcmOptB(e.target.value)}
                        placeholder="الخيار B"
                        required
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono text-cyan-400 w-4">C:</span>
                      <input
                        type="text"
                        value={qcmOptC}
                        onChange={(e) => setQcmOptC(e.target.value)}
                        placeholder="الخيار C (اختياري)"
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono text-cyan-400 w-4">D:</span>
                      <input
                        type="text"
                        value={qcmOptD}
                        onChange={(e) => setQcmOptD(e.target.value)}
                        placeholder="الخيار D (اختياري)"
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono text-cyan-400 w-4">E:</span>
                      <input
                        type="text"
                        value={qcmOptE}
                        onChange={(e) => setQcmOptE(e.target.value)}
                        placeholder="الخيار E (اختياري)"
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">الجواب الصحيح</label>
                      <select
                        value={qcmReponseInput}
                        onChange={(e) => setQcmReponseInput(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono font-bold text-center outline-none focus:border-cyan-500"
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">شرح الجواب (اختياري)</label>
                      <input
                        type="text"
                        value={qcmExplicationInput}
                        onChange={(e) => setQcmExplicationInput(e.target.value)}
                        placeholder="تعليل التصحيح..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition cursor-pointer mt-2 flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>حفظ السؤال في Firestore</span>
                  </button>
                </form>
              </div>

              {/* List Column: Existing QCM packs in Firestore */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                    <span>المجموعات المحفوظة في Firestore ({qcmList.length})</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Collection: "qcm"
                  </span>
                </div>

                {loadingQcm ? (
                  <div className="py-12 text-center text-slate-500 text-xs">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-cyan-400 mb-2" />
                    جاري تحميل بنك الأسئلة من Firestore...
                  </div>
                ) : qcmList.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs space-y-3">
                    <FileQuestion className="w-10 h-10 mx-auto text-slate-600" />
                    <p>لا توجد نماذج مسجلة في collection "qcm" حتى الآن.</p>
                    <button
                      onClick={handleSeedDefaultQcm}
                      disabled={isSeedingQcm}
                      className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-cyan-400 cursor-pointer"
                    >
                      استيراد نماذج Médecine 2025 و ENSA 2024 الآن
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                      <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                        <tr>
                          <th className="p-3">المباراة</th>
                          <th className="p-3">السنة</th>
                          <th className="p-3">المادة</th>
                          <th className="p-3">عدد الأسئلة</th>
                          <th className="p-3 text-center">إجراءات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 text-slate-300">
                        {qcmList.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-800/40 transition">
                            <td className="p-3 font-bold text-white">{item.concours}</td>
                            <td className="p-3 font-mono">{item.annee}</td>
                            <td className="p-3 text-cyan-400 font-medium">{item.matiere}</td>
                            <td className="p-3 font-mono font-bold text-emerald-400">
                              {item.questions?.length || 0} أسئلة
                            </td>
                            <td className="p-3 text-center space-x-2">
                              <button
                                onClick={() => setSelectedQcmForView(item)}
                                className="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 font-semibold cursor-pointer"
                              >
                                استعراض
                              </button>
                              <button
                                onClick={() => handleDeleteQcm(item.id)}
                                className="px-2.5 py-1 bg-rose-500/10 text-rose-400 rounded-lg hover:bg-rose-500/20 font-semibold cursor-pointer"
                              >
                                حذف
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Modal: View Individual User Details */}
      {selectedSessionForModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 max-w-lg w-full rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  تفاصيل اختبار: {selectedSessionForModal.nom_utilisateur}
                </h3>
                <span className="text-xs text-cyan-400 font-mono">
                  {selectedSessionForModal.concours} {selectedSessionForModal.annee} — النقطة: {selectedSessionForModal.score_total} pts
                </span>
              </div>
              <button
                onClick={() => setSelectedSessionForModal(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-300">الأسئلة التي تم تسجيلها:</h4>
              {selectedSessionForModal.reponses?.map((r, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    r.correcte
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300'
                      : 'bg-rose-500/5 border-rose-500/20 text-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {r.correcte ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                    <span className="font-bold">السؤال #{r.question_id}</span>
                  </div>
                  <div className="text-left font-mono text-[11px]">
                    {r.correcte ? (
                      <span className="text-emerald-400">إجابة صحيحة ({r.reponse_donnee})</span>
                    ) : (
                      <span className="text-rose-400">إجابة خاطئة : {r.reponse_donnee || 'فارغ'}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedSessionForModal(null)}
                className="w-full py-2 bg-slate-800 text-white font-bold rounded-xl text-xs hover:bg-slate-700"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: View QCM Questions Pack */}
      {selectedQcmForView && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 max-w-2xl w-full rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  أسئلة {selectedQcmForView.concours} ({selectedQcmForView.annee}) — {selectedQcmForView.matiere}
                </h3>
                <span className="text-xs text-cyan-400 font-mono">
                  إجمالي الأسئلة: {selectedQcmForView.questions?.length || 0}
                </span>
              </div>
              <button
                onClick={() => setSelectedQcmForView(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {selectedQcmForView.questions?.map((q, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white font-mono">السؤال #{q.id || idx + 1}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                      الجواب: {q.reponse}
                    </span>
                  </div>
                  <p className="text-slate-200 leading-relaxed font-sans">{q.enonce}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px] text-slate-400">
                    {q.options?.A && <div className={q.reponse === 'A' ? 'text-emerald-400 font-bold' : ''}>A. {q.options.A}</div>}
                    {q.options?.B && <div className={q.reponse === 'B' ? 'text-emerald-400 font-bold' : ''}>B. {q.options.B}</div>}
                    {q.options?.C && <div className={q.reponse === 'C' ? 'text-emerald-400 font-bold' : ''}>C. {q.options.C}</div>}
                    {q.options?.D && <div className={q.reponse === 'D' ? 'text-emerald-400 font-bold' : ''}>D. {q.options.D}</div>}
                    {q.options?.E && <div className={q.reponse === 'E' ? 'text-emerald-400 font-bold' : ''}>E. {q.options.E}</div>}
                  </div>

                  {q.explication && (
                    <div className="mt-2 p-2 bg-slate-900 rounded-lg text-[11px] text-cyan-300 font-mono">
                      💡 {q.explication}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedQcmForView(null)}
                className="w-full py-2.5 bg-slate-800 text-white font-bold rounded-xl text-xs hover:bg-slate-700 cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
