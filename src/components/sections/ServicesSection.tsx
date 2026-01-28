import React from 'react';
import { motion } from 'framer-motion';
import { ServiceCard } from '../ServiceCard';
import { images } from '../../utils/assets';
import { responsiveText } from '../../utils/theme';

interface ServicesSectionProps {
  fadeInUp: any;
  handleMouseEnter: (type: string) => void;
  handleMouseLeave: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  fadeInUp,
  handleMouseEnter,
  handleMouseLeave
}) => {
  return (
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
        <ServiceCard
          image={images.photorealisticRendering}
          title="Photorealistic Rendering"
          description="High-quality static images for marketing, real estate, and presentations."
        />
        
        <ServiceCard
          image={images.walkthrough3d}
          title="3D Walkthrough & Animation"
          description="Cinematic video tours showcasing the project dynamically."
        />
        
        <ServiceCard
          image={images.virtualTours}
          title="360° Virtual Tours & VR"
          description="Fully interactive experiences for immersive client engagement."
        />
        
        <ServiceCard
          image={images.interactiveExperiences}
          title="Real-time Interactive Experiences"
          description="Unreal Engine or Unity-based interactive models where clients can explore spaces freely."
        />
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
  );
};