'use client';

import React, { useState, useEffect, useRef } from 'react';

interface CursorProps {
  cursorVariant?: string;
  cursorVisible?: boolean;
  hoveredElement?: string | null;
  hoveredIcon?: number | null;
}

const Cursor: React.FC<CursorProps> = ({
  cursorVariant = 'default',
  cursorVisible = true,
  hoveredElement = null,
  hoveredIcon = null,
}) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isInitialized, setIsInitialized] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isNavItem, setIsNavItem] = useState(false);
  const requestRef = useRef<number | null>(null);

  // Handle smooth cursor movement using requestAnimationFrame
  const updateCursorPosition = (clientX: number, clientY: number) => {
    if (!cursorRef.current) return;

    const x = clientX;
    const y = clientY;

    setPosition({ x, y });
  };

  // Set up global event listeners to automatically handle text cursor behavior
  useEffect(() => {
    // Ensure this is the only cursor in the app
    const existingCursors = document.querySelectorAll('.cursor-container');
    if (existingCursors.length > 1) {
      console.warn('Multiple cursor instances detected');
    }

    // Ensure the default cursor is disabled
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    // Override any potential inline style that might show a cursor
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      * { cursor: none !important; }
      *:hover { cursor: none !important; }
      input, textarea { cursor: none !important; caret-color: white; }
    `;
    document.head.appendChild(styleTag);

    // Update cursor position on mouse move using RAF for better performance
    const handleMouseMove = (e: MouseEvent) => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }

      requestRef.current = requestAnimationFrame(() => {
        updateCursorPosition(e.clientX, e.clientY);
        if (!isInitialized) {
          setIsInitialized(true);
        }
      });
    };

    // Also update cursor position on scroll to ensure it stays with the viewport
    const handleScroll = () => {
      // Only update if we have a last known mouse position
      if (position.x > 0 && position.y > 0) {
        // We don't need to change the position on scroll since the cursor
        // is fixed to the viewport, not the document
      }
    };

    // Set up global listeners for element interactions
    const addElementListeners = () => {
      // Find all text elements that should show the text cursor
      const textElements = document.querySelectorAll(
        'p, h1, h2, h3, h4, h5, h6, span, label, input, textarea, [contenteditable]'
      );

      // Find all button elements that should show the button cursor
      const buttonElements = document.querySelectorAll(
        'button, .button, .glass-button, a, [role="button"]'
      );

      // Find all navbar items specifically
      const navElements = document.querySelectorAll(
        '.nav-button, .navbar-container button, .navbar-buttons-container'
      );

      // Helper function to set the cursor to text mode
      const setTextMode = () => {
        document.body.setAttribute('data-cursor', 'text');
        setIsNavItem(false);
      };

      // Helper function to reset cursor mode
      const resetCursorMode = () => {
        document.body.setAttribute('data-cursor', 'default');
        setIsNavItem(false);
      };

      // Helper function to set the cursor to navbar mode (which hides it)
      const setNavMode = () => {
        document.body.setAttribute('data-cursor', 'navbar');
        setIsNavItem(true);
      };

      // Add listeners to each text element
      textElements.forEach(element => {
        // Force the element to have cursor: none
        (element as HTMLElement).style.cursor = 'none';

        element.addEventListener('mouseenter', setTextMode);
        element.addEventListener('mouseleave', resetCursorMode);

        // For input elements, also handle focus/blur
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.addEventListener('focus', setTextMode);
          element.addEventListener('blur', resetCursorMode);
        }
      });

      // Force buttons to have cursor: none but don't change cursor style
      buttonElements.forEach(element => {
        (element as HTMLElement).style.cursor = 'none';
      });

      // Add specific listeners to navbar elements to hide cursor
      navElements.forEach(element => {
        (element as HTMLElement).style.cursor = 'none';

        element.addEventListener('mouseenter', setNavMode);
        element.addEventListener('mouseleave', resetCursorMode);
      });

      // Clean up function to remove all listeners
      return () => {
        textElements.forEach(element => {
          element.removeEventListener('mouseenter', setTextMode);
          element.removeEventListener('mouseleave', resetCursorMode);

          if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.removeEventListener('focus', setTextMode);
            element.removeEventListener('blur', resetCursorMode);
          }
        });

        buttonElements.forEach(element => {
          (element as HTMLElement).style.cursor = 'none';
        });

        navElements.forEach(element => {
          element.removeEventListener('mouseenter', setNavMode);
          element.removeEventListener('mouseleave', resetCursorMode);
        });
      };
    };

    // Listen for mousemove and scroll events
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Set up a mutation observer to handle dynamically added elements
    const observer = new MutationObserver(() => {
      const cleanup = addElementListeners();
      return cleanup;
    });

    // Start observing the document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial setup of element listeners
    const cleanup = addElementListeners();

    // Clean up all event listeners on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      cleanup();
      document.head.removeChild(styleTag);

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isInitialized, position.x, position.y]);

  // Get cursor mode - either from props or from body attribute
  const getCursorMode = () => {
    if (hoveredElement) return hoveredElement;
    if (document.body?.getAttribute('data-cursor') === 'text') return 'text';
    if (document.body?.getAttribute('data-cursor') === 'navbar') return 'navbar';
    return cursorVariant;
  };

  // Don't render the cursor if it's not visible or hovering over a navbar icon
  if (!cursorVisible || hoveredIcon !== null || !isInitialized) {
    return null;
  }

  const currentMode = getCursorMode();

  // If in navbar mode, return null to hide the cursor
  if (currentMode === 'navbar' || isNavItem) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="cursor-container z-[100]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        pointerEvents: 'none',
        position: 'fixed'
      }}
    >
      <div
        className={`transition-all duration-150 ease-out ${currentMode === 'text'
            ? 'text-cursor-style opacity-100'
            : 'default-cursor-style opacity-100'
          }`}
      />
    </div>
  );
};

export default Cursor; 