'use client';

import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on client side before accessing browser APIs
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    // Check if device is desktop/laptop (not mobile/tablet)
    const isDesktop = () => {
      if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
      
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent) || 
                      (navigator.maxTouchPoints > 1 && window.innerWidth >= 768);
      return !isMobile && !isTablet;
    };

    // Only initialize Lenis on desktop devices
    if (isDesktop()) {
      lenisRef.current = new Lenis({
        duration: 1.0,
        easing: (t) => {
          // Basic ease-in-out curve
          return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        },
        orientation: 'vertical',
        smoothWheel: false,
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
  }, [isClient]);

  // Expose lenis instance globally for navigation
  useEffect(() => {
    if (isClient && lenisRef.current) {
      (window as { lenis?: Lenis }).lenis = lenisRef.current;
    }
  }, [isClient]);

  return <>{children}</>;
}