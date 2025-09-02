import Image from 'next/image';
import { useHover } from '@/hooks/useHover';
import { responsiveText } from '@/utils/theme';

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  className?: string;
}

export const ServiceCard = ({ image, title, description, className = "" }: ServiceCardProps) => {
  const { getHoverProps } = useHover();

  return (
    <div className={`about-card h-full ${className}`} {...getHoverProps("button")}>
      <div className="mb-3 md:mb-4 aspect-[4/3] overflow-hidden rounded-lg relative">
        <Image
          src={image}
          alt={title}
          className="object-cover"
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          loading="lazy"
        />
      </div>
      <h3 className={`${responsiveText.cardTitle} font-medium mb-1 md:mb-2`} {...getHoverProps("text")}>
        {title}
      </h3>
      <p className={`${responsiveText.cardText} text-white/70`} {...getHoverProps("text")}>
        {description}
      </p>
    </div>
  );
};