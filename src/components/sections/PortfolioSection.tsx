import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '../ProjectCard';
import { images } from '../../utils/assets';
import { responsiveText } from '../../utils/theme';

interface PortfolioSectionProps {
  fadeInUp: any;
  handleMouseEnter: (type: string) => void;
  handleMouseLeave: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
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
          Featured Projects
        </h2>
        <p className={`${responsiveText.paragraph} section-description`} onMouseEnter={() => handleMouseEnter("text")} onMouseLeave={handleMouseLeave}>
          Explore our latest architectural visualizations created with Unreal Engine 5
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 h-auto" style={{ gridAutoRows: "1fr" }}>
        <ProjectCard
          image={images.panoramicView}
          title="360° Panoramic Views"
          description="Fully interactive experiences for immersive client engagement. Explore spaces as if you were there."
          tags={["VR Ready"]}
          className="col-span-12 md:col-span-8"
        />
        
        <ProjectCard
          image={images.surroundingInfo}
          title="Surrounding Information"
          description="Detailed surrounding area information with interactive maps."
          tags={["Interactive Map"]}
          className="col-span-12 md:col-span-4"
        />
        
        <ProjectCard
          image={images.archvizApp}
          title="Archviz Application"
          description="Cinematic video tours showcasing projects dynamically."
          tags={["Unreal Engine 5"]}
          className="col-span-12 md:col-span-4"
        />
        
        <ProjectCard
          image={images.realtimeRendering}
          title="Real-Time Rendering"
          description="High-quality static images for marketing, real estate, and presentations with photorealistic details."
          tags={["Photorealistic"]}
          className="col-span-12 md:col-span-8"
        />
      </div>
    </motion.section>
  );
};