import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { X, ChevronDown, ChevronUp, Megaphone, Sparkles } from 'lucide-react';

const StickyAdBanner = ({
  adClient = import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT_ID || '',
  adSlot = import.meta.env.VITE_GOOGLE_ADSENSE_SLOT_ID || '',
  adFormat = 'horizontal',
  fullWidthResponsive = true,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const adRef = useRef(null);
  const location = useLocation();

  const isPlaceholderClient =
    !adClient ||
    adClient === 'ca-pub-XXXXXXXXXXXXXXXX' ||
    adClient.includes('XXXX');

  // Load Google AdSense script dynamically if not present
  useEffect(() => {
    if (isPlaceholderClient || typeof window === 'undefined') return;

    const scriptId = 'google-adsense-script';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  }, [adClient, isPlaceholderClient]);

  // Initialize adsbygoogle on mount and route change
  useEffect(() => {
    if (isPlaceholderClient || typeof window === 'undefined') return;

    const timer = setTimeout(() => {
      try {
        if (adRef.current) {
          const hasStatus = adRef.current.getAttribute('data-adsbygoogle-status');
          if (!hasStatus) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        }
      } catch (err) {
        console.warn('Google AdSense banner push notice:', err);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [location.pathname, adClient, adSlot, isPlaceholderClient]);

  if (!isVisible) {
    return (
      <aside
        aria-label="Reopen advertisement"
        className="fixed bottom-3 right-4 z-40 transition-all duration-300"
      >
        <button
          onClick={() => {
            setIsVisible(true);
            setIsCollapsed(false);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/90 hover:bg-slate-700 hover:text-white border border-slate-700/80 rounded-full shadow-lg backdrop-blur-md transition-all duration-200 cursor-pointer"
          title="Restore advertisement banner"
        >
          <Megaphone className="w-3.5 h-3.5 text-orange-400" />
          <span>Show Ad</span>
        </button>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Sticky bottom advertisement banner"
      className={`fixed bottom-0 inset-x-0 z-40 bg-slate-900/95 border-t border-slate-800 backdrop-blur-md shadow-[0_-8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out ${className}`}
    >
      {/* Top Banner Control Header */}
      <div className="max-w-7xl mx-auto px-3 py-1 flex items-center justify-between border-b border-slate-800/60 text-[11px] text-slate-400 select-none">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Sparkles className="w-2.5 h-2.5" />
            Advertisement
          </span>
          <span className="hidden sm:inline text-slate-500">Sponsored</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title={isCollapsed ? "Expand ad banner" : "Minimize ad banner"}
            aria-expanded={!isCollapsed}
            aria-label={isCollapsed ? "Expand advertisement" : "Minimize advertisement"}
          >
            {isCollapsed ? (
              <span className="flex items-center gap-1 text-[10px]">
                <ChevronUp className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Expand</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px]">
                <ChevronDown className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Minimize</span>
              </span>
            )}
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close advertisement banner"
            aria-label="Close advertisement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Ad Content Container */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isCollapsed ? 'max-h-0 opacity-0' : 'max-h-36 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 flex items-center justify-center min-h-[50px] sm:min-h-[90px]">
          {isPlaceholderClient ? (
            /* Development Placeholder when client ID is not configured */
            <div className="w-full max-w-4xl bg-slate-950/70 border border-dashed border-slate-700/80 rounded-lg p-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                  <Megaphone className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200">
                    Google AdSense Sticky Banner (Preview)
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Slot ID: <code className="bg-slate-800 px-1 py-0.5 rounded text-orange-300 font-mono">{adSlot || 'Not set'}</code>
                    <span className="mx-1.5">•</span>
                    Client: <code className="bg-slate-800 px-1 py-0.5 rounded text-slate-300 font-mono">{adClient || 'Not set'}</code>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className="px-2.5 py-1 text-[10px] font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-md">
                  Configure VITE_GOOGLE_ADSENSE_CLIENT_ID in .env
                </span>
              </div>
            </div>
          ) : (
            /* Live Google AdSense Unit */
            <div className="w-full flex justify-center items-center overflow-hidden min-h-[50px] sm:min-h-[90px]">
              <ins
                ref={adRef}
                className="adsbygoogle"
                style={{
                  display: 'block',
                  minWidth: '300px',
                  width: '100%',
                  height: '90px',
                  textAlign: 'center',
                }}
                data-ad-client={adClient}
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
              />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default StickyAdBanner;
