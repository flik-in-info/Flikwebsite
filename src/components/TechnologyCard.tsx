import { ReactNode } from 'react';
import { useHover } from '@/hooks/useHover';
import { responsiveText } from '@/utils/theme';

interface TechnologyCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

export const TechnologyCard = ({ icon, title, description, bgColor, iconColor }: TechnologyCardProps) => {
  const { getHoverProps } = useHover();

  return (
    <div className="flex flex-col items-center" {...getHoverProps("button")}>
      <div className={`w-12 md:w-16 h-12 md:h-16 ${bgColor} rounded-lg flex items-center justify-center mb-3 md:mb-4`}>
        <div className={`w-6 md:w-8 h-6 md:h-8 ${iconColor}`}>
          {icon}
        </div>
      </div>
      <h4 className={`${responsiveText.cardTitle} mb-1 md:mb-2`}>{title}</h4>
      <p className={`${responsiveText.cardText} text-white/70`}>{description}</p>
    </div>
  );
};