import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FeatureCard } from '../FeatureCard';
import { images } from '../../utils/assets';
import { responsiveText } from '../../utils/theme';

interface HomeSectionProps {
  fadeInUp: any;
  featureCards: any[];
  handleMouseEnter: (type: string) => void;
  handleMouseLeave: () => void;
  setShowVRModal: (show: boolean) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  fadeInUp,
  featureCards,
  handleMouseEnter,
  handleMouseLeave,
  setShowVRModal
}) => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="section container-wide min-h-[80vh] flex flex-col justify-center px-4 md:px-0"
    >
      <div className="relative overflow-hidden min-h-[60vh] md:min-h-[70vh] mb-8 md:mb-10 rounded-xl border border-emerald-500/20">
        {/* Background video */}
        <div ref={videoRef} className="absolute inset-0 w-full h-full overflow-hidden z-0">
          {shouldLoadVideo ? (
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
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-emerald-900/20 to-black/40 flex items-center justify-center">
              <div className="text-white/60 text-sm">Loading video...</div>
            </div>
          )}
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
        {featureCards.map((card, index) => (
          <FeatureCard key={index} {...card} />
        ))}
      </div>

      <div className="flex justify-center mt-8 md:mt-16 relative">
        <div className="vr-experience w-full md:w-3/4 lg:w-2/3 h-[250px] md:h-[300px] lg:h-[400px] relative overflow-hidden rounded-xl bg-black/20">
          <Image
            src={images.realtimeRendering}
            alt="VR Experience"
            className="absolute inset-0 object-cover opacity-70"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 66vw"
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
  );
};