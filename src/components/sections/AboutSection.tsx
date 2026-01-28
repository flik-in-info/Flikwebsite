import React from 'react';
import { motion } from 'framer-motion';

interface AboutSectionProps {
  fadeInUp: { hidden: { opacity: number; y: number }; visible: { opacity: number; y: number } };
  handleMouseEnter: (type: string) => void;
  handleMouseLeave: () => void;
  setShowPinterestGallery: (show: boolean) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  fadeInUp,
  handleMouseEnter,
  handleMouseLeave,
  setShowPinterestGallery
}) => {
  return (
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Fast Performance</h3>
                <p className="text-sm text-white/70 mt-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  Optimized for speed and efficiency
                </p>
              </div>
            </div>
          </div>

          <div className="about-card" onMouseEnter={() => handleMouseEnter("button")} onMouseLeave={handleMouseLeave}>
            <div className="flex flex-col h-full">
              <div className="flex-1 flex items-center justify-center p-6">
                <svg className="w-16 h-16 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-medium" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>Client Focused</h3>
                <p className="text-sm text-white/70 mt-2" onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
                  Dedicated to your success
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <button
          className="glass-button px-8 py-3 bg-emerald-500/20 hover:bg-emerald-500/30"
          onClick={() => setShowPinterestGallery(true)}
          onMouseEnter={() => handleMouseEnter("button")}
          onMouseLeave={handleMouseLeave}
        >
          View Photo Gallery
        </button>
      </div>
    </motion.section>
  );
};