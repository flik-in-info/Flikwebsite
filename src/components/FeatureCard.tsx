import { ReactNode } from 'react';
import { useHover } from '@/hooks/useHover';
import { responsiveText } from '@/utils/theme';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconBgColor?: string;
  iconTextColor?: string;
}

export const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  iconBgColor = "bg-emerald-500/20",
  iconTextColor = "text-emerald-400" 
}: FeatureCardProps) => {
  const { getHoverProps } = useHover();

  return (
    <div className="glass-morphism p-4 md:p-6 flex flex-col items-center text-center" {...getHoverProps("button")}>
      <div className={`w-12 md:w-16 h-12 md:h-16 ${iconBgColor} p-3 md:p-4 rounded-lg mb-3 md:mb-4 flex items-center justify-center`}>
        <div className={`w-6 md:w-8 h-6 md:h-8 ${iconTextColor}`}>
          {icon}
        </div>
      </div>
      <h3 className={`${responsiveText.cardTitle} font-medium mb-2`} {...getHoverProps("text")}>
        {title}
      </h3>
      <p className={`${responsiveText.cardText} text-white/70`} {...getHoverProps("text")}>
        {description}
      </p>
    </div>
  );
};