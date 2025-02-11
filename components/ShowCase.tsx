import React from 'react';
import Image from 'next/image';
import { MoveUpRight } from 'lucide-react';
import Card1 from './ui/Card1';

// Reusable Card component
const Card = ({ src, title }: { src: string; title: string }) => (
  <article className="relative pb-8 overflow-hidden rounded-md hover:shadow-lg transition-shadow duration-300">
    <div className="w-full h-72 md:h-96 lg:h-[450px] overflow-hidden rounded-xl">
      <Image
        src={src}
        alt={title}
        height={450}
        width={900}
        className="h-full w-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
      />
    </div>
    {/* Title and Button Wrapper */}
    <div className="absolute bottom-0 left-0 w-full bg-black/60 p-5 flex flex-col items-center gap-3">
      <h3 className="sm:text-lg text-sm text-white rounded-xl px-4 py-1 text-center w-full">
        {title}
      </h3>
      <button className="group relative inline-flex h-12 min-w-12 items-center justify-center overflow-hidden rounded-full bg-[#080918] font-medium text-neutral-200 border-2 transition-all duration-300 hover:min-w-24 focus:min-w-24">
        {/* Default (Icon) */}
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover:opacity-0 group-focus:opacity-0">
          <MoveUpRight className="transition-transform duration-200 group-hover:translate-x-3 group-focus:translate-x-3" />
        </div>

        {/* Hover (Visit Text) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus:opacity-100">
          Visit
        </div>
      </button>
    </div>
  </article>
);

function ShowCase() {
  const images = [
    {
      src: 'https://i.pinimg.com/736x/b3/90/eb/b390ebef49e21940461fc6e626f96eb9.jpg', // Image 1
      title: 'Modern Architecture', // Title for Image 1
    },
    {
      src: 'https://i.pinimg.com/736x/af/ee/77/afee775be378605cc4c606c1e2105159.jpg', // Image 2
      title: 'Luxury Interiors', // Title for Image 2
    },
    {
      src: 'https://i.pinimg.com/736x/de/10/27/de1027e2dc6ae6eb68d46ccb69d4985f.jpg', // Image 3
      title: 'Contemporary Design', // Title for Image 3
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8 lg:px-16">
      {images.map((image, index) => (
        <Card key={index} src={image.src} title={image.title} />
      ))}
    </div>
  );
}

export default ShowCase;
