'use client';

import { useState, useCallback, useEffect, useRef, Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFolder, faUser, faEnvelope, faVrCardboard, faStar } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Cursor from '@/components/Cursor';
import { useHover } from '@/hooks/useHover';
import { HomeSection } from '@/components/sections/HomeSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PinterestGallery } from '@/components/gallery/PinterestGallery';
import { VRModal } from '@/components/modals/VRModal';
import { Header } from '@/components/layout/Header';
import LenisProvider from '@/components/providers/LenisProvider';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [showVRModal, setShowVRModal] = useState(false);
  const [showPinterestGallery, setShowPinterestGallery] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [clickedIcon, setClickedIcon] = useState<number | null>(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [panoramaPosition, setPanoramaPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    color: string;
  }>>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Use the new hover hook
  const { handleMouseEnter, handleMouseLeave} = useHover();

  // Define icons first, before any functions that use it
  const icons = [
    { icon: faHouse, label: "Home" },
    { icon: faFolder, label: "Portfolio" },
    { icon: faVrCardboard, label: "Services" },
    { icon: faUser, label: "About" },
    { icon: faEnvelope, label: "Contact" },
    { icon: faStar, label: "Testimonials" },
  ];

  // Feature cards data
  const featureCards = [
    {
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: "Real-time Rendering",
      description: "Interactive walkthroughs with photorealistic quality powered by Unreal Engine 5.",
      iconBgColor: "bg-emerald-500/20",
      iconTextColor: "text-emerald-400"
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Global Access",
      description: "Share your visualizations with clients anywhere in the world.",
      iconBgColor: "bg-blue-500/20",
      iconTextColor: "text-blue-400"
    },
    {
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Mobile Compatible",
      description: "Experience immersive visualizations on any device, including mobile phones and tablets.",
      iconBgColor: "bg-purple-500/20",
      iconTextColor: "text-purple-400"
    }
  ];

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

  // Device detection and cursor visibility
  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      const screenWidth = window.innerWidth;

      // Check if device is mobile or tablet
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTablet = /iPad|Android(?=.*\bTablet\b)/i.test(userAgent) ||
        (screenWidth >= 768 && screenWidth <= 1024 && isMobile);

      if (isMobile && !isTablet) {
        setDeviceType('mobile');
        setCursorVisible(false); // Hide cursor on mobile
      } else if (isTablet) {
        setDeviceType('tablet');
        setCursorVisible(false); // Hide cursor on tablet
      } else {
        setDeviceType('desktop');
        setCursorVisible(true); // Show cursor on desktop
      }
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);

    return () => {
      window.removeEventListener('resize', detectDevice);
    };
  }, []);

  // Handle cursor click functionality - removed global click handler
  // Now navbar only responds to direct clicks on navbar items

  const handleIconHover = (index: number | null) => {
    // Only set hover state if no icon is currently clicked
    if (clickedIcon === null) {
      setHoveredIcon(index);
    }
  };

  const handleIconClick = (index: number | null) => {
    // Clear hover state when clicking
    setHoveredIcon(null);

    // Only navigate if clicking on a valid section
    if (index !== null) {
      // Set clicked icon to the selected index
      setClickedIcon(index);

      // Scroll to the corresponding section
      const sections = ["home", "portfolio", "services", "about", "contact", "testimonials"];
      if (index < sections.length) {
        const section = document.getElementById(sections[index]);
        if (section) {
          // Use Lenis for smooth scrolling
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(section);
    }
          setCurrentSection(index);
        }
      }
    }
  };

  // Get current section based on scroll position
  const getCurrentSection = () => {
    const sections = ["home", "portfolio", "services", "about", "contact", "testimonials"];
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        return i;
      }
    }
    return 0;
  };

  // Navigate to specific section
  const navigateToSection = (sectionIndex: number) => {
    const sections = ["home", "portfolio", "services", "about", "contact", "testimonials"];
    if (sectionIndex >= 0 && sectionIndex < sections.length) {
      const section = document.getElementById(sections[sectionIndex]);
      if (section) {
        // Use Lenis for smooth scrolling
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(section);
    }
        setCurrentSection(sectionIndex);
        // Don't automatically set clicked icon - only manual navbar clicks should do this
        // Clear hover state when navigating
        setHoveredIcon(null);
      }
    }
  };

  // Handle keyboard navigation
  const handleKeyNavigation = useCallback((e: KeyboardEvent) => {
    // Don't interfere if user is typing in an input field
    const activeElement = document.activeElement;
    if (activeElement && (
      activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.getAttribute('contenteditable') === 'true'
    )) {
      return;
    }

    const sections = ["home", "portfolio", "services", "about", "contact", "testimonials"];
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

  // Update current section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const current = getCurrentSection();
      setCurrentSection(current);

      // If user scrolled to a different section than the clicked one, clear the clicked state
      if (clickedIcon !== null && clickedIcon !== current) {
        setClickedIcon(null);
      }

      // Only clear hover state if no icon is manually clicked
      if (clickedIcon === null) {
        setHoveredIcon(null);
      }
    };

    // Use Lenis scroll event if available, fallback to window scroll
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.on('scroll', handleScroll);
      return () => lenis.off('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [clickedIcon]);

  // Add keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => window.removeEventListener('keydown', handleKeyNavigation);
  }, [handleKeyNavigation]);


  // Add click handler to clear navbar clicked state when clicking outside navbar
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if click is outside navbar
      if (!target.closest('.bottom-navigation') && !target.closest('.nav-button')) {
        // Clear clicked state when clicking outside navbar
        setClickedIcon(null);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  const sections = [
    {
      id: 'home',
      content: (
        <HomeSection
          fadeInUp={fadeInUp}
          featureCards={featureCards}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          setShowVRModal={setShowVRModal}
        />
      ),
    },
    {
      id: 'portfolio',
      content: (
        <PortfolioSection
          fadeInUp={fadeInUp}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      ),
    },
    {
      id: 'services',
      content: (
        <ServicesSection
          fadeInUp={fadeInUp}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      ),
    },
    {
      id: 'about',
      content: (
        <AboutSection
          fadeInUp={fadeInUp}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          setShowPinterestGallery={setShowPinterestGallery}
        />
      ),
    },
    {
      id: 'testimonials',
      content: (
        <TestimonialsSection
          fadeInUp={fadeInUp}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      ),
    },
    {
      id: 'contact',
      content: (
        <ContactSection
          fadeInUp={fadeInUp}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      ),
    },
  ];

  // Particle animation effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor(window.innerWidth / 10); // Adjust particle density

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.5 - 0.25,
          color: `rgba(16, 185, 129, ${Math.random() * 0.3 + 0.1})`,
        });
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Simple animation without mouse interaction
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -1;
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy *= -1;
        }

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - distance / 80)})`; // Fade with distance
            ctx.lineWidth = 0.2;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Set up and start animation
    setCanvasSize();
    initParticles();
    animate();
    window.addEventListener('resize', () => {
      setCanvasSize();
      initParticles();
    });

    // Clean up
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Device detection and cursor management
  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bTablet\b)/i.test(userAgent) ||
        (window.innerWidth >= 768 && window.innerWidth <= 1024);

      if (isMobile && !isTablet) {
        setDeviceType('mobile');
        setCursorVisible(false);
      } else if (isTablet) {
        setDeviceType('tablet');
        setCursorVisible(false); // Default to hidden for tablets
      } else {
        setDeviceType('desktop');
        setCursorVisible(true);
      }
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);

    return () => {
      window.removeEventListener('resize', detectDevice);
    };
  }, []);


  return (
    <LenisProvider>
      <div className="relative">
      {/* Interactive Particle Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Background Effects - Lightened Further */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.2),rgba(15,40,35,0.85))]" />

      {/* Animated Glass Background Effect */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-emerald-500/20" />

        {/* Animated Glass Orbs - Lightened */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-emerald-900/20 blur-3xl animate-pulse"
          style={{ animationDuration: '15s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-emerald-600/20 blur-3xl animate-pulse"
          style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute top-3/4 right-1/3 w-[20vw] h-[20vw] rounded-full bg-emerald-700/20 blur-3xl animate-pulse"
          style={{ animationDuration: '20s', animationDelay: '5s' }} />

        {/* Moving Glass Lines */}
        <div className="absolute inset-0">
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent top-1/4 animate-[gradient-x_15s_linear_infinite]"></div>
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent top-2/4 animate-[gradient-x_25s_linear_infinite_reverse]"></div>
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent top-3/4 animate-[gradient-x_20s_linear_infinite]"></div>
        </div>

        {/* Floating 3D Objects */}
        <div className="absolute top-[15%] left-[10%] w-24 h-24 opacity-20 animate-float" style={{ animationDelay: '0s' }}>
          <svg className="w-full h-full text-emerald-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22L3 17V7L12 2L21 7V17L12 22Z" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.2" />
          </svg>
        </div>
        <div className="absolute top-[45%] right-[15%] w-16 h-16 opacity-20 animate-rotate-3d" style={{ animationDelay: '1s' }}>
          <svg className="w-full h-full text-emerald-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.2" />
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.2" />
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.2" />
          </svg>
        </div>
        <div className="absolute bottom-[20%] left-[20%] w-20 h-20 opacity-20 animate-float-slow" style={{ animationDelay: '2s' }}>
          <svg className="w-full h-full text-emerald-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 7L17 10.5V17.5L12 21L7 17.5V10.5L12 7Z" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.2" />
            <path d="M12 7V2M7 10.5L2 7M17 10.5L22 7" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="absolute top-[35%] left-[30%] w-16 h-16 opacity-15 animate-spin-slow">
          <svg className="w-full h-full text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.1" />
            <path d="M12 2V4M12 20V22M2 12H4M20 12H22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="absolute bottom-[35%] right-[25%] w-20 h-20 opacity-15 animate-spin-reverse">
          <svg className="w-full h-full text-emerald-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.1" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.1" />
            <path d="M12 4V8M12 16V20M4 12H8M16 12H20" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="absolute top-[65%] right-[10%] w-24 h-24 opacity-20 animate-float-slower" style={{ animationDelay: '3s' }}>
          <svg className="w-full h-full text-emerald-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L21 6.5V17.5L12 22L3 17.5V6.5L12 2Z" stroke="currentColor" strokeWidth="0.5" fill="currentColor" fillOpacity="0.1" />
            <path d="M12 2L12 22" stroke="currentColor" strokeWidth="0.5" />
            <path d="M3 6.5L21 6.5" stroke="currentColor" strokeWidth="0.5" />
            <path d="M3 17.5L21 17.5" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      {/* Rest of the existing background elements - Lightened */}
      <div className="fixed inset-0">
        <div className="absolute -top-[30%] -right-[20%] w-[80%] h-[80%] rounded-full bg-emerald-900/25 blur-3xl" />
        <div className="absolute -bottom-[30%] -left-[20%] w-[80%] h-[80%] rounded-full bg-emerald-900/25 blur-3xl" />
      </div>

      {/* Custom cursor as a separate component */}
      <Cursor
        hoveredIcon={hoveredIcon}
        cursorVisible={cursorVisible}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-6">
        <Header onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        {sections.map((section) => (
          <div key={section.id} id={section.id}>
            {section.content}
          </div>
        ))}

        {/* Footer */}
        <footer className="mt-24 mb-16">
          <div className="glass-morphism p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="mb-4">
                  <Image
                    src="/assets/flik-logo.png"
                    alt="Flik Logo"
                    width={120}
                    height={48}
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-white/70 text-sm mb-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  Flik is a premier architectural visualization studio creating immersive experiences with cutting-edge technology.
                </p>
                <div className="flex gap-4">
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="bg-black/40 p-3 rounded-lg hover:bg-gray-700/40 transition-colors duration-300"
                      onMouseEnter={() => handleMouseEnter("button")}
                      onMouseLeave={handleMouseLeave}
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com/_flik.in_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black/40 p-3 rounded-lg hover:bg-gray-700/40 transition-colors duration-300"
                      onMouseEnter={() => handleMouseEnter("button")}
                      onMouseLeave={handleMouseLeave}
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-black/40 p-3 rounded-lg hover:bg-gray-700/40 transition-colors duration-300"
                      onMouseEnter={() => handleMouseEnter("button")}
                      onMouseLeave={handleMouseLeave}
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  Services
                </h4>
                <ul className="space-y-2 text-white/70">
                  <li><a href="#services" className="hover:text-emerald-300 transition-colors" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Photorealistic Rendering</a></li>
                  <li><a href="#services" className="hover:text-emerald-300 transition-colors" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>3D Walkthrough & Animation</a></li>
                  <li><a href="#services" className="hover:text-emerald-300 transition-colors" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>360° Virtual Tours & VR</a></li>
                  <li><a href="#services" className="hover:text-emerald-300 transition-colors" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Real-time Interactive Experiences</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  Company
                </h4>
                <ul className="space-y-2 text-white/70">
                  <li><a href="#about" className="hover:text-emerald-300 transition-colors" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>About Us</a></li>
                  <li><a href="#portfolio" className="hover:text-emerald-300 transition-colors" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Portfolio</a></li>
                  <li><a href="#" className="hover:text-emerald-300 transition-colors" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Careers</a></li>
                  <li><a href="#" className="hover:text-emerald-300 transition-colors" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Blog</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-white/50" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                © {new Date().getFullYear()} Flik. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-white/50">
                <a href="#" className="hover:text-white transition-colors" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* VR Modal */}
      <Suspense fallback={<div>Loading...</div>}>
        <VRModal
          showVRModal={showVRModal}
          setShowVRModal={setShowVRModal}
          panoramaPosition={panoramaPosition}
          setPanoramaPosition={setPanoramaPosition}
          zoom={zoom}
          setZoom={setZoom}
        />
      </Suspense>

      {/* Pinterest Gallery */}
      <Suspense fallback={<div>Loading...</div>}>
        <PinterestGallery
          isOpen={showPinterestGallery}
          onClose={() => setShowPinterestGallery(false)}
        />
      </Suspense>

      {/* Floating bottom navigation - Hidden when VR modal is shown */}
      {!showVRModal && !showPinterestGallery && (
        <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pb-4">
          <div className="bottom-navigation">
            <div className="navbar-container">
              <div className="navbar-buttons-container">
                {icons.map((iconData, index) => (
                  <button
                    key={index}
                    className={`nav-button ${clickedIcon === index || (clickedIcon === null && hoveredIcon === index) ? 'active' : ''
                      }`}
                    onMouseEnter={() => handleIconHover(index)}
                    onMouseLeave={() => handleIconHover(null)}
                    onClick={() => handleIconClick(index)}
                  >
                    <FontAwesomeIcon
                      icon={iconData.icon}
                      className="nav-button-icon"
                    />
                    <span className="nav-button-label">{iconData.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </LenisProvider>
  );
}
