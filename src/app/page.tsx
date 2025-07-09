'use client';

import { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFolder, faUser, faEnvelope, faVrCardboard, faStar } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Header from '@/components/Header';
import Cursor from '@/components/Cursor';
import { images } from '@/utils/assets';

// Lazy load components
const VRModal = lazy(() => import('@/components/VRModal'));
const PinterestGallery = lazy(() => import('@/components/PinterestGallery'));

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Add responsive font size classes
const responsiveText = {
  heading: "text-3xl md:text-4xl lg:text-6xl",
  subheading: "text-xl md:text-2xl",
  paragraph: "text-sm md:text-base lg:text-xl",
  button: "text-sm md:text-base lg:text-lg",
  sectionTitle: "text-2xl md:text-3xl lg:text-4xl",
  cardTitle: "text-lg md:text-xl",
  cardText: "text-xs md:text-sm",
};

export default function Home() {
  const [showVRModal, setShowVRModal] = useState(false);
  const [showPinterestGallery, setShowPinterestGallery] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [clickedIcon, setClickedIcon] = useState<number | null>(null);
  const [hoveredElement, setHoveredElement] = useState<string>('');
  const [cursorVisible, setCursorVisible] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentSection, setCurrentSection] = useState(0);
  const [panoramaPosition, setPanoramaPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  // Removed cursorClickActive state - no longer needed
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

  // Define icons first, before any functions that use it
  const icons = [
    { icon: faHouse, label: "Home" },
    { icon: faFolder, label: "Portfolio" },
    { icon: faVrCardboard, label: "Services" },
    { icon: faUser, label: "About" },
    { icon: faEnvelope, label: "Contact" },
    { icon: faStar, label: "Testimonials" },
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

  const handleMouseEnter = useCallback((element: string) => {
    setHoveredElement(element);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredElement('');
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
          section.scrollIntoView({ behavior: "smooth" });
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
        section.scrollIntoView({ behavior: "smooth" });
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="section container-wide min-h-[80vh] flex flex-col justify-center px-4 md:px-0"
        >
          <div className="relative overflow-hidden min-h-[60vh] md:min-h-[70vh] mb-8 md:mb-10 rounded-xl border border-emerald-500/20">
            {/* Background video */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
              <iframe
                src="https://player.vimeo.com/video/1099624247?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;loop=1&amp;muted=1&amp;controls=0&amp;background=1"
                className="opacity-80"
                style={{ 
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) scale(1.2)',
                  width: '100%',
                  height: '100%',
                  minWidth: '100%',
                  minHeight: '100%',
                  pointerEvents: 'none'
                }}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                title="bg-video"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-emerald-900/20"></div>
            </div>
            
            {/* Content with higher z-index */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full py-10 md:py-16">
              <motion.div
                className="w-full max-w-md mx-auto flex justify-center mb-8 md:mb-12"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
                }}
              >
                {/* Logo removed by user */}
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mt-4 md:mt-6">
            <div className="glass-morphism p-4 md:p-6 flex flex-col items-center text-center" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="w-12 md:w-16 h-12 md:h-16 bg-emerald-500/20 p-3 md:p-4 rounded-lg mb-3 md:mb-4 flex items-center justify-center">
                <svg className="w-6 md:w-8 h-6 md:h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className={`${responsiveText.cardTitle} font-medium mb-2`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Real-time Rendering</h3>
              <p className={`${responsiveText.cardText} text-white/70`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Interactive walkthroughs with photorealistic quality powered by Unreal Engine 5.</p>
            </div>

            <div className="glass-morphism p-4 md:p-6 flex flex-col items-center text-center" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="w-12 md:w-16 h-12 md:h-16 bg-blue-500/20 p-3 md:p-4 rounded-lg mb-3 md:mb-4 flex items-center justify-center">
                <svg className="w-6 md:w-8 h-6 md:h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={`${responsiveText.cardTitle} font-medium mb-2`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Global Access</h3>
              <p className={`${responsiveText.cardText} text-white/70`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Share your visualizations with clients anywhere in the world.</p>
            </div>

            <div className="glass-morphism p-4 md:p-6 flex flex-col items-center text-center" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="w-12 md:w-16 h-12 md:h-16 bg-purple-500/20 p-3 md:p-4 rounded-lg mb-3 md:mb-4 flex items-center justify-center">
                <svg className="w-6 md:w-8 h-6 md:h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className={`${responsiveText.cardTitle} font-medium mb-2`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Mobile Compatible</h3>
              <p className={`${responsiveText.cardText} text-white/70`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Experience immersive visualizations on any device, including mobile phones and tablets.</p>
            </div>
          </div>

          <div className="flex justify-center mt-8 md:mt-16 relative">
            <div className="vr-experience w-full md:w-3/4 lg:w-2/3 h-[250px] md:h-[300px] lg:h-[400px] relative overflow-hidden rounded-xl bg-black/20">
              <Image
                src={images.realtimeRendering}
                alt="VR Experience"
                className="absolute inset-0 object-cover opacity-70"
                fill
                sizes="(max-width: 768px) 100vw, 75vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="p-4 md:p-8 w-full">
                  <h3 className={`${responsiveText.subheading} font-medium mb-3 md:mb-4`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Virtual Reality Experience
                  </h3>
                  <p className={`${responsiveText.cardText} text-white/70 mb-4 md:mb-6 max-w-md`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Try our immersive VR demo and explore architectural spaces like never before. Feel the scale, lighting, and atmosphere of your future project.
                  </p>
                  <div className="flex justify-center">
                    <button
                      className="glass-button px-4 md:px-6 py-2 md:py-3 bg-emerald-500/20 hover:bg-emerald-500/30"
                      onClick={() => setShowVRModal(true)}
                      onMouseEnter={() => handleMouseEnter("button")}
                      onMouseLeave={handleMouseLeave}
                    >
                      Launch Demo
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 hidden md:flex gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <div className="text-xs text-white/70">Experience Available</div>
              </div>
            </div>
          </div>
        </motion.section>
      ),
    },
    {
      id: 'portfolio',
      content: (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="section container-wide px-4 md:px-0"
        >
          <div className="glass-morphism p-4 md:p-8 mb-6 md:mb-10">
            <h2 className={`${responsiveText.sectionTitle} section-title`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              Featured Projects
            </h2>
            <p className={`${responsiveText.paragraph} section-description`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              Explore our latest architectural visualizations created with Unreal Engine 5
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 h-auto" style={{ gridAutoRows: "1fr" }}>
            {/* Card 1: 360° Panoramic Views - LARGER card (top-left) */}
            <motion.div
              className="project-card col-span-12 md:col-span-8 h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onMouseEnter={() => handleMouseEnter("button")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative h-full w-full">
                <Image
                  src={images.panoramicView}
                  alt="360° Panoramic Views"
                  className="absolute inset-0 object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  priority
                />
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className={`${responsiveText.subheading} font-medium text-white`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    360° Panoramic Views
                  </h3>
                  <p className={`${responsiveText.cardText} text-white/70 mt-1 md:mt-2`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Fully interactive experiences for immersive client engagement. Explore spaces as if you were there.
                  </p>
                  <div className="flex items-center gap-2 mt-2 md:mt-4">
                    <span className="text-xs bg-emerald-900/30 text-emerald-200 py-1 px-2 rounded" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      VR Ready
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Surrounding Information - SMALLER card */}
            <motion.div
              className="project-card col-span-12 md:col-span-4 h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onMouseEnter={() => handleMouseEnter("button")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative h-full w-full">
                <Image
                  src={images.surroundingInfo}
                  alt="Surrounding Information"
                  className="absolute inset-0 object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className={`${responsiveText.cardTitle} font-medium text-white`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Surrounding Information
                  </h3>
                  <p className={`${responsiveText.cardText} text-white/70 mt-1 md:mt-2`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Detailed surrounding area information with interactive maps.
                  </p>
                  <div className="flex items-center gap-2 mt-2 md:mt-3">
                    <span className="text-xs bg-blue-900/30 text-blue-200 py-1 px-2 rounded" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Interactive Map
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Archviz Application - SMALLER card */}
            <motion.div
              className="project-card col-span-12 md:col-span-4 h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onMouseEnter={() => handleMouseEnter("button")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative h-full w-full">
                <Image
                  src={images.archvizApp}
                  alt="Archviz Application"
                  className="absolute inset-0 object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className={`${responsiveText.cardTitle} font-medium text-white`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Archviz Application
                  </h3>
                  <p className={`${responsiveText.cardText} text-white/70 mt-1 md:mt-2`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Cinematic video tours showcasing projects dynamically.
                  </p>
                  <div className="flex items-center gap-2 mt-2 md:mt-3">
                    <span className="text-xs bg-emerald-900/30 text-emerald-200 py-1 px-2 rounded" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Unreal Engine 5
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Real-Time Rendering - LARGER card (bottom-right) */}
            <motion.div
              className="project-card col-span-12 md:col-span-8 h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onMouseEnter={() => handleMouseEnter("button")}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative h-full w-full">
                <Image
                  src={images.realtimeRendering}
                  alt="Real-Time Rendering"
                  className="absolute inset-0 object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className={`${responsiveText.subheading} font-medium text-white`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Real-Time Rendering
                  </h3>
                  <p className={`${responsiveText.cardText} text-white/70 mt-1 md:mt-2`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    High-quality static images for marketing, real estate, and presentations with photorealistic details.
                  </p>
                  <div className="flex items-center gap-2 mt-2 md:mt-4">
                    <span className="text-xs bg-purple-900/30 text-purple-200 py-1 px-2 rounded" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Photorealistic
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      ),
    },
    {
      id: 'services',
      content: (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="section container-wide px-4 md:px-0"
        >
          <div className="glass-morphism p-4 md:p-8 mb-6 md:mb-10">
            <h2 className={`${responsiveText.sectionTitle} section-title`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              Services
            </h2>
            <p className={`${responsiveText.paragraph} section-description`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              At Flik, we specialize in high-end architectural visualization, delivering stunning, immersive, and interactive experiences. Our services are designed to bring your vision to life with precision and realism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Service 1: Photorealistic Rendering */}
            <div className="about-card h-full" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="mb-3 md:mb-4 aspect-[4/3] overflow-hidden rounded-lg relative">
                <Image
                  src={images.photorealisticRendering}
                  alt="Photorealistic Rendering"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <h3 className={`${responsiveText.cardTitle} font-medium mb-1 md:mb-2`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                Photorealistic Rendering
              </h3>
              <p className={`${responsiveText.cardText} text-white/70`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                High-quality static images for marketing, real estate, and presentations.
              </p>
            </div>

            {/* Service 2: 3D Walkthrough & Animation */}
            <div className="about-card h-full" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="mb-3 md:mb-4 aspect-[4/3] overflow-hidden rounded-lg relative">
                <Image
                  src={images.walkthrough3d}
                  alt="3D Walkthrough & Animation"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <h3 className={`${responsiveText.cardTitle} font-medium mb-1 md:mb-2`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                3D Walkthrough & Animation
              </h3>
              <p className={`${responsiveText.cardText} text-white/70`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                Cinematic video tours showcasing the project dynamically.
              </p>
            </div>

            {/* Service 3: 360° Virtual Tours & VR */}
            <div className="about-card h-full" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="mb-3 md:mb-4 aspect-[4/3] overflow-hidden rounded-lg relative">
                <Image
                  src={images.virtualTours}
                  alt="360° Virtual Tours & VR"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <h3 className={`${responsiveText.cardTitle} font-medium mb-1 md:mb-2`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                360° Virtual Tours & VR
              </h3>
              <p className={`${responsiveText.cardText} text-white/70`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                Fully interactive experiences for immersive client engagement.
              </p>
            </div>

            {/* Service 4: Real-time Interactive Experiences */}
            <div className="about-card h-full" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="mb-3 md:mb-4 aspect-[4/3] overflow-hidden rounded-lg relative">
                <Image
                  src={images.interactiveExperiences}
                  alt="Real-time Interactive Experiences"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <h3 className={`${responsiveText.cardTitle} font-medium mb-1 md:mb-2`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                Real-time Interactive Experiences
              </h3>
              <p className={`${responsiveText.cardText} text-white/70`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                Unreal Engine or Unity-based interactive models where clients can explore spaces freely.
              </p>
            </div>
          </div>

          <div className="mt-8 md:mt-16 glass-morphism p-4 md:p-8">
            <div className="flex flex-col items-center text-center">
              <h3 className={`${responsiveText.subheading} font-medium mb-4 md:mb-6`} onMouseEnter={() => handleMouseEnter("")} onMouseLeave={handleMouseLeave}>
                Our Technology Solutions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
                <div className="flex flex-col items-center"
                  onMouseEnter={() => handleMouseEnter("button")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-12 md:w-16 h-12 md:h-16 bg-emerald-900/30 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                    <svg className="w-6 md:w-8 h-6 md:h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h4 className={`${responsiveText.cardTitle} mb-1 md:mb-2`}>AI-Powered Optimization</h4>
                  <p className={`${responsiveText.cardText} text-white/70`}>Enhance performance with real-time AI-driven adjustments.</p>
                </div>

                <div className="flex flex-col items-center"
                  onMouseEnter={() => handleMouseEnter("button")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-12 md:w-16 h-12 md:h-16 bg-blue-900/30 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                    <svg className="w-6 md:w-8 h-6 md:h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className={`${responsiveText.cardTitle} mb-1 md:mb-2`}>Ultra-Responsive Design</h4>
                  <p className={`${responsiveText.cardText} text-white/70`}>Experience seamless interactions across all devices.</p>
                </div>

                <div className="flex flex-col items-center"
                  onMouseEnter={() => handleMouseEnter("button")}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="w-12 md:w-16 h-12 md:h-16 bg-purple-900/30 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                    <svg className="w-6 md:w-8 h-6 md:h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className={`${responsiveText.cardTitle} mb-1 md:mb-2`}>Secure & Scalable</h4>
                  <p className={`${responsiveText.cardText} text-white/70`}>Built with enterprise-level security and infinite scalability.</p>
                </div>
              </div>

              <button
                className="glass-button px-8 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 mt-4"
                onMouseEnter={() => handleMouseEnter("button")}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Learn More About Our Services
              </button>
            </div>
          </div>
        </motion.section>
      ),
    },
    {
      id: 'about',
      content: (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="section container-wide"
        >
          <div className="glass-morphism p-8 mb-10">
            <h2 className="section-title" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              About Flik
            </h2>
            <p className="section-description" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              At Flik, we bring cutting-edge technology to architectural visualization, ensuring high performance, seamless interaction, and top-tier security. Our premium solutions are designed to enhance your workflow, improve client engagement, and provide unparalleled efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-morphism p-8">
              <h3 className="text-2xl font-medium mb-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                Our Approach
              </h3>
              <p className="mb-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                We bring architecture to life through cutting-edge visualization techniques. Explore our portfolio and immerse yourself in stunning, lifelike experiences.
              </p>
              <p className="mb-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                Step into the world of Flik, where creativity meets precision. Our Photo Gallery showcases breathtaking high-resolution renders, capturing every intricate detail with stunning realism.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                  <div className="stats bg-black/40 p-4 rounded-lg border border-gray-700/50">
                    <h4 className="text-4xl font-bold text-emerald-400" onMouseEnter={() => handleMouseEnter("")} onMouseLeave={handleMouseLeave}>5+</h4>
                    <p className="text-sm text-white/70">Completed Projects</p>
                  </div>
                </div>
                <div onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                  <div className="stats bg-black/40 p-4 rounded-lg border border-gray-700/50">
                    <h4 className="text-4xl font-bold text-blue-400" onMouseEnter={() => handleMouseEnter("")} onMouseLeave={handleMouseLeave}>2+</h4>
                    <p className="text-sm text-white/70">Years Experience</p>
                  </div>
                </div>
                <div onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                  <div className="stats bg-black/40 p-4 rounded-lg border border-gray-700/50">
                    <h4 className="text-4xl font-bold text-purple-400" onMouseEnter={() => handleMouseEnter("")} onMouseLeave={handleMouseLeave}>100%</h4>
                    <p className="text-sm text-white/70">Client Satisfaction</p>
                  </div>
                </div>
                <div onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                  <div className="stats bg-black/40 p-4 rounded-lg border border-gray-700/50">
                    <h4 className="text-4xl font-bold text-pink-400" onMouseEnter={() => handleMouseEnter("")} onMouseLeave={handleMouseLeave}>4+</h4>
                    <p className="text-sm text-white/70">Global Clients</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="about-card" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                <div className="flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center p-6"
                    onMouseLeave={handleMouseLeave}>
                    <svg className="w-16 h-16 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Customized Solutions</h3>
                    <p className="text-sm text-white/70 mt-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Tailored to your specific project needs
                    </p>
                  </div>
                </div>
              </div>

              <div className="about-card" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                <div className="flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center p-6">
                    <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Modern Technology</h3>
                    <p className="text-sm text-white/70 mt-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Using the latest visualization tools
                    </p>
                  </div>
                </div>
              </div>

              <div className="about-card" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                <div className="flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center p-6">
                    <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Expert Team</h3>
                    <p className="text-sm text-white/70 mt-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Industry professionals with years of experience
                    </p>
                  </div>
                </div>
              </div>

              <div className="about-card" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                <div className="flex flex-col h-full">
                  <div className="flex-1 flex items-center justify-center p-6">
                    <svg className="w-16 h-16 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Fast Delivery</h3>
                    <p className="text-sm text-white/70 mt-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Quick turnaround for time-sensitive projects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 glass-morphism p-8">
            <h3 className="text-2xl font-medium mb-6 text-center" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              Our Visual Showcase
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="about-card p-0 overflow-hidden relative visual-showcase-item" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                <div 
                  className="relative w-full h-48 cursor-pointer visual-showcase-item" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPinterestGallery(true);
                  }}
                  style={{ 
                    touchAction: 'manipulation',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTouchCallout: 'none'
                  }}
                >
                  <Image
                    src={images.visualShowcase1}
                    alt="Visual Showcase"
                    className="object-cover transition-transform hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-sm font-medium">Tap to explore</p>
                  </div>
                </div>
              </div>
              <div className="about-card p-0 overflow-hidden relative visual-showcase-item" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                <div 
                  className="relative w-full h-48 cursor-pointer visual-showcase-item" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPinterestGallery(true);
                  }}
                  style={{ 
                    touchAction: 'manipulation',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTouchCallout: 'none'
                  }}
                >
                  <Image
                    src={images.visualShowcase2}
                    alt="Visual Showcase"
                    className="object-cover transition-transform hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-sm font-medium">Tap to explore</p>
                  </div>
                </div>
              </div>
              <div className="about-card p-0 overflow-hidden relative visual-showcase-item" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
                <div 
                  className="relative w-full h-48 cursor-pointer visual-showcase-item" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPinterestGallery(true);
                  }}
                  style={{ 
                    touchAction: 'manipulation',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    WebkitTouchCallout: 'none'
                  }}
                >
                  <Image
                    src={images.visualShowcase3}
                    alt="Visual Showcase"
                    className="object-cover transition-transform hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-sm font-medium">Tap to explore</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-white/70" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                Experience architectural visualization like never before—crafted with passion, innovation, and an unwavering commitment to excellence.
              </p>
            </div>
          </div>
        </motion.section>
      ),
    },
    {
      id: 'contact',
      content: (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="section container-wide"
        >
          <div className="glass-morphism p-8 mb-10">
            <h2 className="section-title" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              Contact Us
            </h2>
            <p className="section-description" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              Drop us a line or two, we are open for creative minds and collaborations!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <div className="glass-morphism p-8">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="bg-black/40 border border-gray-700/50 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3"
                      placeholder="John Doe"
                      onMouseEnter={() => handleMouseEnter("")}
                      onMouseLeave={handleMouseLeave}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-black/40 border border-gray-700/50 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3"
                      placeholder="name@example.com"
                      onMouseEnter={() => handleMouseEnter("")}
                      onMouseLeave={handleMouseLeave}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="bg-black/40 border border-gray-700/50 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3"
                      placeholder="How can we help?"
                      onMouseEnter={() => handleMouseEnter("")}
                      onMouseLeave={handleMouseLeave}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                      Your message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="bg-black/40 border border-gray-700/50 text-white text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3"
                      placeholder="Let us know how we can help you..."
                      onMouseEnter={() => handleMouseEnter("")}
                      onMouseLeave={handleMouseLeave}
                    ></textarea>
                  </div>
                  <motion.button
                    className="glass-button px-8 py-3 bg-emerald-500/20 hover:bg-emerald-500/30"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    onMouseEnter={() => handleMouseEnter("button")}
                    onMouseLeave={handleMouseLeave}
                    onClick={(e) => {
                      e.preventDefault();
                      const name = (document.getElementById('name') as HTMLInputElement)?.value || '';
                      const email = (document.getElementById('email') as HTMLInputElement)?.value || '';
                      const subject = (document.getElementById('subject') as HTMLInputElement)?.value || '';
                      const message = (document.getElementById('message') as HTMLTextAreaElement)?.value || '';
                      
                      const mailtoLink = `mailto:flik.in.info@gmail.com?subject=${encodeURIComponent(subject || 'Contact Form Submission')}&body=${encodeURIComponent(
                        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                      )}`;
                      
                      window.location.href = mailtoLink;
                    }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass-morphism p-8 h-full">
                <h3 className="text-2xl font-medium mb-6" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  Get in Touch
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4"
                    onMouseEnter={() => handleMouseEnter("button")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-emerald-500/20 p-3 rounded-lg mt-1">
                      <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Our Location</h4>
                      <p className="text-white/70 text-sm">
                        Andheri East, Mumbai<br />
                        Maharashtra, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4"
                    onMouseEnter={() => handleMouseEnter("button")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-blue-500/20 p-3 rounded-lg mt-1">
                      <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Email Us</h4>
                      <p className="text-white/70 text-sm">
                        flik.in.info@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4"
                    onMouseEnter={() => handleMouseEnter("button")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-purple-500/20 p-3 rounded-lg mt-1">
                      <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">Call Us</h4>
                      <p className="text-white/70 text-sm">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-medium mb-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Follow Us
                  </h4>
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
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-8 text-center text-white/50 text-sm">
            <div onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              <p>© 2023 Flik Visuals. All rights reserved.</p>
            </div>
            <div className="flex gap-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </motion.section>
      ),
    },
    {
      id: 'testimonials',
      content: (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="section container-wide"
        >
          <div className="glass-morphism p-8 mb-10">
            <h2 className="section-title" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              Client Testimonials
            </h2>
            <p className="section-description" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
              Hear what our clients have to say about their experience working with Flik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Testimonial 1 */}
            <div className="glass-morphism p-6 md:p-8" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-white/80 mb-6 italic text-sm" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                &ldquo;Flik transformed our architectural vision into stunning reality. The level of detail and photorealism in their work is absolutely incredible. Our clients were amazed by the virtual tours.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <span className="text-emerald-300 font-medium">AR</span>
                </div>
                <div>
                  <h4 className="font-medium text-white" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Arjun Reddy
                  </h4>
                  <p className="text-white/60 text-sm" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Principal Architect, RedDesign Studio
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="glass-morphism p-6 md:p-8" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-white/80 mb-6 italic text-sm" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                &ldquo;Working with Flik has been a game-changer for our real estate business. The interactive 3D walkthroughs help our clients visualize their future homes perfectly. Highly recommended!&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-300 font-medium">PS</span>
                </div>
                <div>
                  <h4 className="font-medium text-white" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Priya Sharma
                  </h4>
                  <p className="text-white/60 text-sm" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Director, Luxury Homes Mumbai
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="glass-morphism p-6 md:p-8" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-white/80 mb-6 italic text-sm" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                &ldquo;The attention to detail and technical expertise at Flik is unmatched. They delivered our project on time with exceptional quality. The VR experience was mind-blowing!&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-purple-300 font-medium">RK</span>
                </div>
                <div>
                  <h4 className="font-medium text-white" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Rajesh Kumar
                  </h4>
                  <p className="text-white/60 text-sm" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    CEO, Modern Spaces Pvt Ltd
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="glass-morphism p-6 md:p-8" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-white/80 mb-6 italic text-sm" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                &ldquo;Flik&apos;s architectural visualizations helped us secure major clients. The photorealistic renders and interactive experiences set us apart from the competition. Truly professional work!&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <span className="text-emerald-300 font-medium">SN</span>
                </div>
                <div>
                  <h4 className="font-medium text-white" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Sneha Nair
                  </h4>
                  <p className="text-white/60 text-sm" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Founder, Nair Architects
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 5 */}
            <div className="glass-morphism p-6 md:p-8" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-white/80 mb-6 italic text-sm" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                &ldquo;The team at Flik is incredibly talented and professional. They understood our vision perfectly and delivered beyond our expectations. The 360° tours are absolutely stunning!&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center">
                  <span className="text-pink-300 font-medium">VG</span>
                </div>
                <div>
                  <h4 className="font-medium text-white" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Vikram Gupta
                  </h4>
                  <p className="text-white/60 text-sm" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Project Manager, Elite Constructions
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 6 */}
            <div className="glass-morphism p-6 md:p-8" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-white/80 mb-6 italic text-sm" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                &ldquo;Flik&apos;s work speaks for itself. The quality of their architectural visualizations is world-class. They&apos;ve helped us present our projects in the most compelling way possible.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <span className="text-orange-300 font-medium">AM</span>
                </div>
                <div>
                  <h4 className="font-medium text-white" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Anita Mehta
                  </h4>
                  <p className="text-white/60 text-sm" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    Creative Director, Mehta Design House
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
              <motion.button
                className="glass-button px-8 py-3 bg-emerald-500/20 hover:bg-emerald-500/30"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                onMouseEnter={() => handleMouseEnter("button")}
                onMouseLeave={handleMouseLeave}
              >
              Share Your Experience
              </motion.button>
          </div>
        </motion.section>
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
      const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bTablet\b)|Android(?=.*\bTablet\b)/i.test(userAgent) || 
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
        hoveredElement={hoveredElement}
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
                  />
                </div>
                <p className="text-white/70 text-sm mb-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  Flik is a premier architectural visualization studio creating immersive experiences with cutting-edge technology.
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="bg-black/40 p-2 rounded-lg hover:bg-emerald-900/40 transition-colors duration-300"
                    onMouseEnter={() => handleMouseEnter("button")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-black/40 p-2 rounded-lg hover:bg-emerald-900/40 transition-colors duration-300"
                    onMouseEnter={() => handleMouseEnter("button")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-black/40 p-2 rounded-lg hover:bg-emerald-900/40 transition-colors duration-300"
                    onMouseEnter={() => handleMouseEnter("button")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
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
              
              <div>
                <h4 className="text-lg font-medium mb-4" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  Contact
                </h4>
                <ul className="space-y-3 text-white/70 text-sm">
                  <li className="flex items-start gap-3" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    <svg className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>123 Design Studio, Creative District<br />San Francisco, CA 94103</span>
                  </li>
                  <li className="flex items-start gap-3" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    <svg className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>info@flikvisuals.com</span>
                  </li>
                  <li className="flex items-start gap-3" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                    <svg className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+1 (555) 123-4567</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-white/50" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                © {new Date().getFullYear()} Flik Visuals. All rights reserved.
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
                                      className={`nav-button ${
                    clickedIcon === index || (clickedIcon === null && hoveredIcon === index) ? 'active' : ''
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
  );
}
