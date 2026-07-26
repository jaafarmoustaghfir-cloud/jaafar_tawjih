import React from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string;
  className?: string;
  asInline?: boolean;
}

/**
 * Normalizes text formulas containing math notations into valid KaTeX strings or clean formatted HTML.
 */
function convertTextToLaTeX(str: string): string {
  if (!str) return '';

  let formatted = str;

  // Convert common calculus & algebra notation patterns if not already LaTeX
  formatted = formatted
    // Integrals
    .replace(/∫₀\^π/g, '\\int_{0}^{\\pi}')
    .replace(/∫₀¹/g, '\\int_{0}^{1}')
    .replace(/∫/g, '\\int ')
    // Square roots
    .replace(/√\(([^)]+)\)/g, '\\sqrt{$1}')
    .replace(/√(\d+)/g, '\\sqrt{$1}')
    .replace(/√/g, '\\sqrt{}')
    // Derivatives / dots
    .replace(/ẍ/g, '\\ddot{x}')
    .replace(/ẋ/g, '\\dot{x}')
    // Vector notations & products
    .replace(/\(u∧v\)·w/g, '(\\vec{u} \\wedge \\vec{v}) \\cdot \\vec{w}')
    .replace(/AD = x·AB \+ y·AC/g, '\\vec{AD} = x \\cdot \\vec{AB} + y \\cdot \\vec{AC}')
    .replace(/AD/g, (match, offset, fullText) => {
      // Only replace AD when it's talking about vector AD in Math section
      if (fullText.includes('plan vectoriel') || fullText.includes('combinaison linéaire') || fullText.includes('AB et AC')) {
        return '\\vec{AD}';
      }
      return match;
    })
    .replace(/AB/g, (match, offset, fullText) => {
      if (fullText.includes('plan vectoriel') || fullText.includes('combinaison linéaire') || fullText.includes('AC')) {
        return '\\vec{AB}';
      }
      return match;
    })
    .replace(/AC/g, (match, offset, fullText) => {
      if (fullText.includes('plan vectoriel') || fullText.includes('combinaison linéaire')) {
        return '\\vec{AC}';
      }
      return match;
    })
    // Exponential & powers
    .replace(/e\^\((-?\w+\+?\d*)\)/g, 'e^{$1}')
    .replace(/e\^\((-?\w+)\)/g, 'e^{$1}')
    .replace(/2\^10/g, '2^{10}')
    // Conjugate
    .replace(/ā/g, '\\bar{a}')
    // Probability
    .replace(/P_A\(B\)/g, 'P_{A}(B)');

  return formatted;
}

export const MathText: React.FC<MathTextProps> = ({ text, className = '', asInline = true }) => {
  if (!text) return null;

  // If text contains LaTeX markers, backslashes, fractions, integrals, powers, or chemical notation
  const hasMath = /[\\$^_{}∫√ẍẋāπΔ]|\d+·10|10⁻|10²|10⁹|10⁴|P_A|dUR\/dt|RE\/L|\[H3O\+\]|\[HO-\]|CH3NH2|HCOOH|S2O8|SO4/i.test(
    text
  );

  if (!hasMath) {
    return <span className={className}>{text}</span>;
  }

  // Helper to parse string into segments (text vs LaTeX)
  const renderMathContent = () => {
    // If string has explicit $...$ delimiters
    if (text.includes('$')) {
      const parts = text.split('$');
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          // Inside math
          try {
            const html = katex.renderToString(part, { displayMode: false, throwOnError: false });
            return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
          } catch {
            return <code key={index}>{part}</code>;
          }
        }
        return <span key={index}>{part}</span>;
      });
    }

    // Try rendering converted LaTeX formula or format inline
    const latexExpr = convertTextToLaTeX(text);

    // If string is primarily a formula or equation
    const isFullFormula =
      /^(\\int|\\vec|\\ddot|\\sqrt|dUR\/dt|e\^|I =|J =|z =|f\(x\)=|KA1 =|P_{A}|10⁻|3\.10⁻)/.test(latexExpr) ||
      (text.includes('=') && (text.includes('cos') || text.includes('sin') || text.includes('∫') || text.includes('√')));

    if (isFullFormula) {
      try {
        const html = katex.renderToString(latexExpr, {
          displayMode: !asInline,
          throwOnError: false,
        });
        return <span dangerouslySetInnerHTML={{ __html: html }} />;
      } catch {
        // Fallback
      }
    }

    // Render formatted text with KaTeX for math words if possible, or standard clean HTML for chemical formulas
    return <span>{text}</span>;
  };

  return <span className={`inline-math-container ${className}`}>{renderMathContent()}</span>;
};

export default MathText;
