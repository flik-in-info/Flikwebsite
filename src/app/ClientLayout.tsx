'use client';

import { useState, useEffect } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Cursor from '@/components/Cursor';

config.autoAddCss = false;

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    // Listen for custom events from the bottom navbar
    const handleHideCustomCursor = () => {
      setCursorVisible(false);
    };

    const handleShowCustomCursor = () => {
      setCursorVisible(true);
    };

    window.addEventListener('hideCustomCursor', handleHideCustomCursor);
    window.addEventListener('showCustomCursor', handleShowCustomCursor);

    return () => {
      window.removeEventListener('hideCustomCursor', handleHideCustomCursor);
      window.removeEventListener('showCustomCursor', handleShowCustomCursor);
    };
  }, []);

  return (
    <>
      {/* Use the unified cursor component */}
      <Cursor cursorVisible={cursorVisible} />

      <div className="min-h-screen">
        {children}
      </div>
    </>
  );
} 