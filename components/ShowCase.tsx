import React from 'react';
import Image from 'next/image';
import { MoveUpRight } from 'lucide-react';

// Reusable Card component
const Card = ({ src, title }: { src: string; title: string }) => (
  <article className="relative pb-4 overflow-hidden rounded-md hover:shadow-lg transition-shadow duration-300">
    <div className="w-full h-72 md:h-96 lg:h-[450px] overflow-hidden rounded-xl">
      <Image
        src={src}
        alt={title}
        height={450} // Adjusted height for better visual balance
        width={900} // Adjusted width for better balance
        className="h-full w-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
      />
    </div>
    <div className="absolute bottom-4 text-black w-full p-4 flex justify-between items-center">
      <h3 className="sm:text-xl text-sm bg-black text-white rounded-xl p-2 px-4">
        {title}
      </h3>
      <button className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#080918] font-medium text-neutral-200 border-2 transition-all duration-300 hover:w-24">
        <div className="inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-x-3 group-hover:opacity-100">
          Visit
        </div>
        <div className="absolute right-3">
          <MoveUpRight />
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
