'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PinterestGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

const interiorImages = [
  {
    src: '/assets/interior/IMG_0001.jpg',
    title: 'Minimalist Modern Interior',
    description: 'Clean lines and contemporary elegance',
    height: 400
  },
  {
    src: '/assets/interior/IMG_0002.jpg',
    title: 'Elegant Modern Living Room',
    description: 'Sophisticated glamour meets modern comfort',
    height: 350
  },
  {
    src: '/assets/interior/IMG_0003.jpg',
    title: 'Contemporary Open Layout',
    description: 'Spacious and airy interior design',
    height: 450
  },
  {
    src: '/assets/interior/IMG_0004.jpg',
    title: 'Open Kitchen & Living Area',
    description: 'Seamless integration of cooking and living spaces',
    height: 380
  },
  {
    src: '/assets/interior/IMG_0005.jpg',
    title: 'Residential Living Room',
    description: 'Comfortable and stylish family living',
    height: 360
  },
  {
    src: '/assets/interior/IMG_0006.jpg',
    title: 'Modern Kitchen Design',
    description: 'Functional and beautiful culinary space',
    height: 440
  },
  {
    src: '/assets/interior/IMG_0007.jpg',
    title: 'Relaxing Evening Space',
    description: 'Tranquil environment for unwinding',
    height: 320
  },
  {
    src: '/assets/interior/IMG_0008.jpg',
    title: 'Indian Living Room Inspiration',
    description: 'Traditional meets contemporary design',
    height: 460
  },
  {
    src: '/assets/interior/IMG_0009.jpg',
    title: 'Interior Design Concept',
    description: 'Creative and innovative space planning',
    height: 340
  },
  {
    src: '/assets/interior/IMG_0010.jpg',
    title: 'Arisha Apartment Complex',
    description: 'Modern apartment interior styling',
    height: 390
  }
];

const PinterestGallery: React.FC<PinterestGalleryProps> = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full h-full overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Interior Gallery</h2>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Pinterest-style Masonry Grid */}
        <div className="p-2 md:p-4">
          {/* Desktop/Tablet Layout - Traditional Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {interiorImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div
                  className="glass-morphism overflow-hidden cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
                  onClick={() => handleImageClick(index)}
                >
                  <div className="relative">
                    <Image
                      src={image.src}
                      alt={image.title}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                      style={{ aspectRatio: 'auto' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-medium text-sm mb-1">{image.title}</h3>
                      <p className="text-xs text-white/70">{image.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Layout - Pinterest-style Masonry */}
          <div className="md:hidden columns-2 gap-2 space-y-2">
            {interiorImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="break-inside-avoid mb-2"
              >
                <div
                  className="relative overflow-hidden cursor-pointer group rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                  onClick={() => handleImageClick(index)}
                  style={{ marginBottom: '8px' }}
                >
                  <div className="relative">
                    <Image
                      src={image.src}
                      alt={image.title}
                      width={200}
                      height={image.height}
                      className="w-full object-cover rounded-lg"
                      style={{ 
                        height: `${image.height}px`,
                        aspectRatio: 'auto'
                      }}
                    />
                    {/* Gradient overlay on hover/tap */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 rounded-lg" />
                    
                    {/* Text overlay that slides up on hover/tap */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-300">
                      <h3 className="font-medium text-sm mb-1 leading-tight">{image.title}</h3>
                      <p className="text-xs text-white/80 leading-tight">{image.description}</p>
                    </div>

                    {/* Pinterest-style pin button */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                      <div className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Save
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Full-screen Image Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={interiorImages[selectedImage].src}
                  alt={interiorImages[selectedImage].title}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-black/50 rounded-full p-2 backdrop-blur-sm"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-4 right-4 text-white bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-2">{interiorImages[selectedImage].title}</h3>
                  <p className="text-white/70">{interiorImages[selectedImage].description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PinterestGallery; 