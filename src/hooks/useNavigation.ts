import { useState, useCallback, useEffect } from 'react';

export const useNavigation = () => {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [clickedIcon, setClickedIcon] = useState<number | null>(null);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = ["home", "portfolio", "services", "about", "contact", "testimonials"];

  const handleIconHover = (index: number | null) => {
    if (clickedIcon === null) {
      setHoveredIcon(index);
    }
  };

  const handleIconClick = (index: number | null) => {
    setHoveredIcon(null);

    if (index !== null) {
      setClickedIcon(index);

      if (index < sections.length) {
        const section = document.getElementById(sections[index]);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          setCurrentSection(index);
        }
      }
    }
  };

  const getCurrentSection = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        return i;
      }
    }
    return 0;
  };

  const navigateToSection = (sectionIndex: number) => {
    if (sectionIndex >= 0 && sectionIndex < sections.length) {
      const section = document.getElementById(sections[sectionIndex]);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setCurrentSection(sectionIndex);
        setHoveredIcon(null);
      }
    }
  };

  const handleKeyNavigation = useCallback((e: KeyboardEvent) => {
    const activeElement = document.activeElement;
    if (activeElement && (
      activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.getAttribute('contenteditable') === 'true'
    )) {
      return;
    }

    const currentIdx = getCurrentSection();

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextSection = (currentIdx + 1) % sections.length;
      navigateToSection(nextSection);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevSection = (currentIdx - 1 + sections.length) % sections.length;
      navigateToSection(prevSection);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const current = getCurrentSection();
      setCurrentSection(current);

      if (clickedIcon !== null && clickedIcon !== current) {
        setClickedIcon(null);
      }

      if (clickedIcon === null) {
        setHoveredIcon(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [clickedIcon]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, [handleKeyNavigation]);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.bottom-navigation') && !target.closest('.nav-button')) {
        setClickedIcon(null);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return {
    hoveredIcon,
    clickedIcon,
    currentSection,
    handleIconHover,
    handleIconClick,
    navigateToSection,
    sections
  };
};