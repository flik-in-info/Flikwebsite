import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useHover } from '@/hooks/useHover';
import { responsiveText } from '@/utils/theme';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  tags?: string[];
  className?: string;
  children?: ReactNode;
}

export const ProjectCard = ({ 
  image, 
  title, 
  description, 
  tags = [], 
  className = "",
  children 
}: ProjectCardProps) => {
  const { getHoverProps } = useHover();

  return (
    <motion.div
      className={`project-card h-full ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...getHoverProps("button")}
    >
      <div className="relative h-full w-full">
        <Image
          src={image}
          alt={title}
          className="absolute inset-0 object-cover"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className={`${responsiveText.subheading} font-medium text-white`} {...getHoverProps("text")}>
            {title}
          </h3>
          <p className={`${responsiveText.cardText} text-white/70 mt-1 md:mt-2`} {...getHoverProps("text")}>
            {description}
          </p>
          {tags.length > 0 && (
            <div className="flex items-center gap-2 mt-2 md:mt-4">
              {tags.map((tag, index) => (
                <span key={index} className="text-xs bg-purple-900/30 text-purple-200 py-1 px-2 rounded" {...getHoverProps("text")}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          {children}
        </div>
      </div>
    </motion.div>
  );
};