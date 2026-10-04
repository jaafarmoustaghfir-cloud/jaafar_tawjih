import React, { useState, useMemo } from 'react';
import { FAQ_DATA, FaqItem } from '../data/faq_data';
import { HelpCircle, Search, ChevronDown, ChevronUp, Sparkles, X } from 'lucide-react';
import AdSenseUnit from './AdSenseUnit';

export const FaqView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [expandedId, setExpandedId] = useState<string | null>(FAQ_DATA[0].id);

  const categories = ['Tous', 'Seuils & Calculs', 'Concours', 'Procédures & Bourses', 'Général'];

  const filteredFaq = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchCat = selectedCategory === 'Tous' || item.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
          <HelpCircle className="h-4 w-4" />
          <span>Foire Aux Questions</span>
        </div>

        <h1 className="mt-3 text-2xl font-black tracking-tight sm:text-3.5xl">
          Questions Fréquentes sur l’Orientation &amp; les Concours au Maroc
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Retrouvez les réponses claires, objectives et vérifiées aux questions que se posent les bacheliers
          marocains et leurs parents concernant les seuils, les inscriptions, les bourses et les concours.
        </p>

        {/* Search Input in Header */}
        <div className="mt-6 relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une question (ex: seuil, médecine, bourse)..."
            className="w-full rounded-xl bg-slate-950/80 border border-slate-700 py-2.5 pl-10 pr-8 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-900 text-white shadow-sm ring-1 ring-blue-700'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaq.length > 0 ? (
          filteredFaq.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition hover:border-slate-300"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="space-y-1 flex-1">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 font-mono">
                      {item.category}
                    </span>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {item.question}
                    </h2>
                  </div>
                  <div className="p-1 rounded-lg bg-slate-50 text-slate-500 shrink-0">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 animate-fadeIn">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-700">Aucune question trouvée pour votre recherche.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('Tous'); }}
              className="text-xs font-bold text-blue-700 underline"
            >
              Afficher toutes les questions
            </button>
          </div>
        )}
      </div>

      {/* Compliant AdSense Unit on FAQ Page */}
      <AdSenseUnit slot="faq_bottom_slot" label={true} />
    </div>
  );
};

export default FaqView;
