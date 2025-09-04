'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if device is desktop/laptop (not mobile/tablet)
    const isDesktop = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent) || 
                      (navigator.maxTouchPoints > 1 && window.innerWidth >= 768);
      return !isMobile && !isTablet;
    };

    // Only initialize Lenis on desktop devices
    if (isDesktop()) {
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => {
          // Smooth ease-in-out with gentle tails
          return t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        },
        orientation: 'vertical',
        smoothWheel: true,
      });

      // Add lenis class to html element
      document.documentElement.classList.add('lenis');

      // Animation frame loop
      function raf(time: number) {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // Cleanup
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        document.documentElement.classList.remove('lenis');
      }
    };
  }, []);

  // Expose lenis instance globally for navigation
  useEffect(() => {
    if (lenisRef.current) {
      (window as any).lenis = lenisRef.current;
    }
  }, []);

  return <>{children}</>;
}