import React from 'react';
import { Mail, Phone, Instagram, Send, HelpCircle, MessageSquare } from 'lucide-react';

export const ContactView: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Banner Card */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 rounded-2xl text-white shadow-md border border-slate-800 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span>Assistance &amp; Orientation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Contactez JAAFAR TAWJIH
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Vous avez des questions sur l'orientation, les seuils d'accès ou les concours de santé ? Retrouvez ci-dessous tous les canaux officiels pour contacter l'équipe.
        </p>
      </div>

      {/* Main Contact Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* WhatsApp Card */}
          <a
            href="https://wa.me/212772908456"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-300 transition duration-150 flex flex-col justify-between space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 1.966 14.113 1.01 11.49 1.01c-5.436 0-9.86 4.37-9.864 9.8 0 1.745.474 3.454 1.374 4.952l-1.002 3.66 3.75-.983zm11.215-3.56c-.27-.135-1.602-.79-1.85-.88-.25-.09-.432-.135-.615.135-.183.27-.71.88-.87 1.065-.16.185-.32.207-.59.072-.27-.135-1.143-.421-2.177-1.344-.805-.718-1.349-1.605-1.507-1.875-.16-.27-.015-.417.12-.551.123-.122.27-.315.405-.472.135-.157.18-.27.27-.45.09-.18.045-.337-.022-.472-.067-.135-.615-1.485-.84-2.03-.22-.53-.442-.457-.615-.466-.16-.007-.343-.01-.525-.01-.18 0-.473.067-.72.337-.248.27-.945.922-.945 2.25 0 1.328.967 2.61 1.102 2.79.135.18 1.902 2.904 4.61 4.07.645.278 1.148.441 1.54.566.65.206 1.24.177 1.706.108.52-.077 1.602-.656 1.83-1.258.226-.6.226-1.12.16-1.228-.067-.108-.25-.153-.52-.287z"/>
                </svg>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 font-mono bg-emerald-100 px-2 py-0.5 rounded">
                +212 7 72 90 84 56
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Assistance WhatsApp</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Échangez directement avec Jaafar Moustaghfir pour un conseil personnalisé.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition">
              <span>Ouvrir WhatsApp</span> →
            </span>
          </a>

          {/* Email Card */}
          <a
            href="mailto:jaafarmoustaghfir@gmail.com"
            className="p-5 rounded-2xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-300 transition duration-150 flex flex-col justify-between space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-md">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-blue-700 font-mono bg-blue-100 px-2 py-0.5 rounded truncate max-w-[150px]">
                jaafarmoustaghfir...
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Contact par E-mail</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Pour toute demande d'information, partenariat ou question sur la plateforme.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-700 flex items-center gap-1 group-hover:translate-x-1 transition">
              <span>Envoyer un courriel</span> →
            </span>
          </a>

          {/* Instagram Card */}
          <a
            href="https://www.instagram.com/tawjih_avenir?igsh=a2Qwem1scWE0MjZz"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl border border-pink-200 bg-pink-50/50 hover:bg-pink-50 hover:border-pink-300 transition duration-150 flex flex-col justify-between space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 to-amber-500 text-white flex items-center justify-center shadow-md">
                <Instagram className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-pink-700 font-mono bg-pink-100 px-2 py-0.5 rounded">
                @tawjih_avenir
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Instagram Officiel</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Suivez les actualités des concours, les alertes de sélection et les stories d'orientation.
              </p>
            </div>
            <span className="text-xs font-bold text-pink-700 flex items-center gap-1 group-hover:translate-x-1 transition">
              <span>Visiter la page</span> →
            </span>
          </a>

          {/* TikTok Card */}
          <a
            href="https://www.tiktok.com/@jaafar_tawjih?_r=1&_t=ZS-97JYWcP76Hv"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl border border-slate-300 bg-slate-50 hover:bg-slate-100 transition duration-150 flex flex-col justify-between space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 fill-current text-sky-400" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .84.13V9.5a6.34 6.34 0 0 0-3.15-.3A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.82a8.16 8.16 0 0 0 4.77 1.52V5.89a4.8 4.8 0 0 1-1.04-.2z"/>
                </svg>
              </div>
              <span className="text-[11px] font-bold text-slate-800 font-mono bg-slate-200 px-2 py-0.5 rounded">
                @jaafar_tawjih
              </span>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Chaîne TikTok</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Vidéos explicatives courtes sur le calcul des notes et la stratégie des concours.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1 group-hover:translate-x-1 transition">
              <span>Voir les vidéos</span> →
            </span>
          </a>
        </div>

        {/* Informational Notice */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
          <p className="font-bold text-slate-800 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            Remarque importante :
          </p>
          <p>
            JAAFAR TAWJIH est un guide indépendant. Pour toute démarche officielle de candidature (inscription FMP, inscription ENSA, avis de sélection), référez-vous toujours aux sites web officiels respectifs des établissements concernés.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
