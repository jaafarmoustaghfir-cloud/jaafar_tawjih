import React, { useEffect, useRef } from 'react';

interface AdSenseUnitProps {
  /** Optional slot ID if user created specific manual slots in AdSense */
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  label?: boolean;
}

/**
 * AdSenseUnit Component
 * 
 * Strict AdSense Compliance:
 * 1. Will NEVER render on /admin or technical/empty routes
 * 2. Provides minimum height to prevent layout shifts (CLS)
 * 3. Safely calls adsbygoogle with error boundary
 */
export const AdSenseUnit: React.FC<AdSenseUnitProps> = ({
  slot = '1234567890',
  format = 'auto',
  responsive = true,
  className = '',
  label = true,
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const isLoadedRef = useRef(false);

  // Check if current page is /admin or technical screen
  const isExcludedScreen = () => {
    if (typeof window === 'undefined') return true;
    const pathname = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return (
      pathname.includes('/admin') ||
      hash.includes('admin') ||
      pathname.includes('/auth') ||
      pathname.includes('/login')
    );
  };

  useEffect(() => {
    if (isExcludedScreen()) return;
    if (isLoadedRef.current) return;

    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        isLoadedRef.current = true;
      }
    } catch (err) {
      // Gracefully catch any AdSense script issues without breaking the React tree
      console.warn('[AdSenseUnit] Script push exception:', err);
    }
  }, []);

  if (isExcludedScreen()) {
    return null;
  }

  return (
    <div className={`my-6 overflow-hidden rounded-xl border border-slate-200/60 bg-slate-50/70 p-3 text-center ${className}`}>
      {label && (
        <div className="mb-1.5 flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          <span>Publicité</span>
          <span>•</span>
          <span className="text-[9px] font-normal text-slate-400">Annonce Sponsorisée Google</span>
        </div>
      )}

      <div className="min-h-[100px] w-full flex items-center justify-center">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', minHeight: '90px' }}
          data-ad-client="ca-pub-3547876172278890"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </div>
  );
};

export default AdSenseUnit;
