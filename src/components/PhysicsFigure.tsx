import React, { useState } from 'react';
import { ImageIcon, InfoIcon, Layers } from 'lucide-react';

interface PhysicsFigureProps {
  questionId: number;
}

export const PhysicsFigure: React.FC<PhysicsFigureProps> = ({ questionId }) => {
  // State tracking image load failures to show fallback vector diagrams seamlessly
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImgError = (key: string) => {
    setImgErrors((prev) => ({ ...prev, [key]: true }));
  };

  if (questionId >= 15 && questionId <= 18) {
    // Pendule élastique horizontal (Ressort + Graphe x(t))
    const fig1Path = '/images/q15-fig1.png';
    const fig2Path = '/images/q15-fig2.png';

    return (
      <div className="mb-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg text-slate-100">
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800 text-xs font-semibold text-slate-300">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <ImageIcon className="w-4 h-4" />
            <span>Figures de Physique — Pendule Élastique Horizontal (Q15–Q18)</span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
            Ressort K, m=200g
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Figure 1: Ressort Horizontal */}
          <div className="flex flex-col items-center bg-slate-950 p-3 rounded-xl border border-slate-800/80">
            <div className="w-full flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-cyan-300">Figure 1 : Schéma du pendule</span>
              <span className="text-[10px] text-slate-500 font-mono">/images/q15-fig1.png</span>
            </div>

            {!imgErrors['q15-fig1'] ? (
              <img
                src={fig1Path}
                alt="Figure 1 : Schéma du ressort horizontal"
                onError={() => handleImgError('q15-fig1')}
                className="max-h-44 object-contain rounded-lg border border-slate-800 w-full"
              />
            ) : null}

            {/* Fallback Vector Illustration for Fig 1 */}
            {imgErrors['q15-fig1'] && (
              <div className="w-full py-4 px-2 flex flex-col items-center justify-center bg-slate-900/60 rounded-lg border border-cyan-500/20">
                <svg className="w-full h-28 max-w-xs" viewBox="0 0 280 100">
                  {/* Support mural */}
                  <line x1="20" y1="10" x2="20" y2="90" stroke="#64748b" strokeWidth="4" />
                  <line x1="10" y1="20" x2="20" y2="10" stroke="#475569" strokeWidth="2" />
                  <line x1="10" y1="40" x2="20" y2="30" stroke="#475569" strokeWidth="2" />
                  <line x1="10" y1="60" x2="20" y2="50" stroke="#475569" strokeWidth="2" />
                  <line x1="10" y1="80" x2="20" y2="70" stroke="#475569" strokeWidth="2" />

                  {/* Sol horizontal */}
                  <line x1="20" y1="80" x2="260" y2="80" stroke="#64748b" strokeWidth="3" />

                  {/* Ressort (spires) */}
                  <path
                    d="M 20 50 L 40 50 L 45 35 L 55 65 L 65 35 L 75 65 L 85 35 L 95 65 L 105 35 L 115 65 L 125 35 L 135 65 L 140 50 L 150 50"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Solide (S) */}
                  <rect x="150" y="30" width="40" height="50" fill="#0284c7" rx="4" stroke="#e0f2fe" strokeWidth="1.5" />
                  <text x="170" y="60" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">
                    (S)
                  </text>

                  {/* Axe Ox */}
                  <line x1="130" y1="90" x2="240" y2="90" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrow)" />
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
                    </marker>
                  </defs>
                  <text x="245" y="94" fill="#f43f5e" fontSize="12" fontWeight="bold">x</text>
                  <line x1="170" y1="80" x2="170" y2="94" stroke="#94a3b8" strokeDasharray="2,2" />
                  <text x="170" y="100" fill="#94a3b8" fontSize="10" textAnchor="middle">O</text>
                </svg>
                <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  <InfoIcon className="w-3 h-3 text-cyan-400 shrink-0" />
                  Emplacement prévu : <code className="text-cyan-300 font-mono">/images/q15-fig1.png</code>
                </p>
              </div>
            )}
          </div>

          {/* Figure 2: Graphe x(t) */}
          <div className="flex flex-col items-center bg-slate-950 p-3 rounded-xl border border-slate-800/80">
            <div className="w-full flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-cyan-300">Figure 2 : Graphe x(t) en cm</span>
              <span className="text-[10px] text-slate-500 font-mono">/images/q15-fig2.png</span>
            </div>

            {!imgErrors['q15-fig2'] ? (
              <img
                src={fig2Path}
                alt="Figure 2 : Graphe x(t)"
                onError={() => handleImgError('q15-fig2')}
                className="max-h-44 object-contain rounded-lg border border-slate-800 w-full"
              />
            ) : null}

            {/* Fallback Vector Illustration for Fig 2 */}
            {imgErrors['q15-fig2'] && (
              <div className="w-full py-4 px-2 flex flex-col items-center justify-center bg-slate-900/60 rounded-lg border border-cyan-500/20">
                <svg className="w-full h-28 max-w-xs" viewBox="0 0 280 110">
                  {/* Axes */}
                  <line x1="30" y1="55" x2="260" y2="55" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="40" y1="10" x2="40" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
                  <text x="260" y="68" fill="#94a3b8" fontSize="10">t (s)</text>
                  <text x="15" y="15" fill="#94a3b8" fontSize="10">x(cm)</text>

                  {/* Graduations */}
                  <text x="25" y="25" fill="#38bdf8" fontSize="10" fontWeight="bold">+3</text>
                  <line x1="37" y1="20" x2="43" y2="20" stroke="#38bdf8" />
                  <text x="25" y="95" fill="#38bdf8" fontSize="10" fontWeight="bold">-3</text>
                  <line x1="37" y1="90" x2="43" y2="90" stroke="#38bdf8" />

                  {/* Courbe cosinus commence à t=0 à x = -3 (lâché vers le sens négatif) */}
                  {/* x(t) = -3 cos(4π t) = 3 cos(4π t + π) */}
                  <path
                    d="M 40 90 Q 65 90 90 55 T 140 20 T 190 55 T 240 90"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />

                  {/* Période T0 = 0.5s */}
                  <line x1="40" y1="100" x2="140" y2="100" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="90" y="108" fill="#f43f5e" fontSize="9" textAnchor="middle" fontWeight="bold">T₀ = 0,5 s</text>
                </svg>
                <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  <InfoIcon className="w-3 h-3 text-cyan-400 shrink-0" />
                  Emplacement prévu : <code className="text-cyan-300 font-mono">/images/q15-fig2.png</code>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (questionId >= 19 && questionId <= 20) {
    // Circuit RL (Générateur + Bobine + Conducteur ohmique & Graphe dUR/dt = f(UR))
    const fig1Path = '/images/q19-fig1.png';
    const fig2Path = '/images/q19-fig2.png';

    return (
      <div className="mb-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg text-slate-100">
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800 text-xs font-semibold text-slate-300">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Layers className="w-4 h-4" />
            <span>Figures de Électricité — Circuit RL (Q19–Q20)</span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
            R=20Ω, Bobine (L, r=0)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Figure 1: Circuit RL */}
          <div className="flex flex-col items-center bg-slate-950 p-3 rounded-xl border border-slate-800/80">
            <div className="w-full flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-cyan-300">Figure 1 : Schéma du circuit RL</span>
              <span className="text-[10px] text-slate-500 font-mono">/images/q19-fig1.png</span>
            </div>

            {!imgErrors['q19-fig1'] ? (
              <img
                src={fig1Path}
                alt="Figure 1 : Schéma du circuit RL"
                onError={() => handleImgError('q19-fig1')}
                className="max-h-44 object-contain rounded-lg border border-slate-800 w-full"
              />
            ) : null}

            {/* Fallback Vector Illustration for Circuit RL */}
            {imgErrors['q19-fig1'] && (
              <div className="w-full py-4 px-2 flex flex-col items-center justify-center bg-slate-900/60 rounded-lg border border-cyan-500/20">
                <svg className="w-full h-28 max-w-xs" viewBox="0 0 280 100">
                  {/* Boucle du circuit */}
                  <rect x="40" y="20" width="200" height="60" fill="none" stroke="#64748b" strokeWidth="2" rx="4" />

                  {/* Générateur E sur le côté gauche */}
                  <circle cx="40" cy="50" r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                  <text x="40" y="54" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                    E
                  </text>

                  {/* Interrupteur K en haut */}
                  <line x1="110" y1="20" x2="135" y2="12" stroke="#f43f5e" strokeWidth="2.5" />
                  <circle cx="110" cy="20" r="2.5" fill="#f43f5e" />
                  <circle cx="140" cy="20" r="2.5" fill="#f43f5e" />
                  <text x="125" y="8" fill="#f43f5e" fontSize="10" textAnchor="middle" fontWeight="bold">
                    K
                  </text>

                  {/* Bobine (L) à droite */}
                  <rect x="230" y="32" width="20" height="36" fill="#0f172a" />
                  <path d="M 240 30 Q 255 35 240 40 Q 255 45 240 50 Q 255 55 240 60 Q 255 65 240 70" fill="none" stroke="#a855f7" strokeWidth="2.5" />
                  <text x="262" y="54" fill="#a855f7" fontSize="11" fontWeight="bold">L</text>

                  {/* Résistance R en bas */}
                  <rect x="110" y="72" width="60" height="16" fill="#0284c7" stroke="#e0f2fe" strokeWidth="1.5" rx="2" />
                  <text x="140" y="84" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                    R = 20Ω
                  </text>
                </svg>
                <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  <InfoIcon className="w-3 h-3 text-cyan-400 shrink-0" />
                  Emplacement prévu : <code className="text-cyan-300 font-mono">/images/q19-fig1.png</code>
                </p>
              </div>
            )}
          </div>

          {/* Figure 2: Graphe dUR/dt = f(UR) */}
          <div className="flex flex-col items-center bg-slate-950 p-3 rounded-xl border border-slate-800/80">
            <div className="w-full flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-cyan-300">Figure 2 : dU<sub>R</sub>/dt = f(U<sub>R</sub>)</span>
              <span className="text-[10px] text-slate-500 font-mono">/images/q19-fig2.png</span>
            </div>

            {!imgErrors['q19-fig2'] ? (
              <img
                src={fig2Path}
                alt="Figure 2 : Graphe dUR/dt en fonction de UR"
                onError={() => handleImgError('q19-fig2')}
                className="max-h-44 object-contain rounded-lg border border-slate-800 w-full"
              />
            ) : null}

            {/* Fallback Vector Illustration for dUR/dt vs UR */}
            {imgErrors['q19-fig2'] && (
              <div className="w-full py-4 px-2 flex flex-col items-center justify-center bg-slate-900/60 rounded-lg border border-cyan-500/20">
                <svg className="w-full h-28 max-w-xs" viewBox="0 0 280 110">
                  {/* Axes */}
                  <line x1="40" y1="90" x2="250" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="40" y1="15" x2="40" y2="95" stroke="#94a3b8" strokeWidth="1.5" />
                  <text x="220" y="104" fill="#94a3b8" fontSize="10">U<sub>R</sub> (V)</text>
                  <text x="10" y="15" fill="#94a3b8" fontSize="9">dU<sub>R</sub>/dt (V.s⁻¹)</text>

                  {/* Droite affine décroissante: dUR/dt = 100 - 20 UR */}
                  <line x1="40" y1="25" x2="220" y2="90" stroke="#a855f7" strokeWidth="2.5" />

                  {/* Ordonnée à l'origine (100 V/s) */}
                  <text x="20" y="30" fill="#a855f7" fontSize="10" fontWeight="bold">100</text>
                  <line x1="37" y1="25" x2="43" y2="25" stroke="#a855f7" />

                  {/* Absice à l'origine (UR max = E = 5V) */}
                  <text x="215" y="104" fill="#a855f7" fontSize="10" fontWeight="bold">5</text>
                  <line x1="220" y1="87" x2="220" y2="93" stroke="#a855f7" />
                </svg>
                <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  <InfoIcon className="w-3 h-3 text-cyan-400 shrink-0" />
                  Emplacement prévu : <code className="text-cyan-300 font-mono">/images/q19-fig2.png</code>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PhysicsFigure;
