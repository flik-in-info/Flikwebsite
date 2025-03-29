"use client"
import { useState } from "react";
import Masonry from "react-masonry-css";

const images = [
  { src: "https://i.pinimg.com/736x/35/b7/13/35b71345adc51956fe5d386ea397aedc.jpg" },
  { src: "https://i.pinimg.com/736x/e4/ed/3d/e4ed3d817c33bd0d06b77168dd2f9439.jpg" },
  { src: "https://i.pinimg.com/736x/3c/62/44/3c6244892a433bd143e7fb7bc8969f14.jpg" },
  { src: "https://i.pinimg.com/736x/b6/1d/e5/b61de5e0ec017d6a083313e056a29d2b.jpg" },
  { src: "https://i.pinimg.com/736x/0f/2d/86/0f2d861080ccccdc2cfc8580049cd0e9.jpg" },
  { src: "https://i.pinimg.com/736x/38/bf/f5/38bff5cf0a9806ccfcd5e36b9371e0b6.jpg" },
  { src: "https://i.pinimg.com/736x/9e/9f/25/9e9f25380b94221d8920c8feff8598eb.jpg" },
  { src: "https://i.pinimg.com/736x/10/07/6c/10076cd9da078f0706934e14ed8c8295.jpg" },
  { src: "https://i.pinimg.com/736x/d8/4e/6e/d84e6ebdee54ed76dfb6d51bf63baf69.jpg" },
  { src: "https://i.pinimg.com/736x/10/2a/78/102a78b208b334888d80914c6b458031.jpg" },
  { src: "https://i.pinimg.com/736x/71/e8/92/71e89213826fcea2f9836569bfc2f062.jpg" },
  { src: "https://i.pinimg.com/736x/83/76/ac/8376ac78b6bb1a76d03f1fb45eef6b0b.jpg" },
  { src: "https://i.pinimg.com/474x/dc/c5/37/dcc537282fac0630bcb339f9d68338a6.jpg" },
  
 
];

export default function Gallery() {
  const [preview, setPreview] = useState<string | null>(null);

  // Masonry Breakpoints (columns change based on screen width)
  const breakpointColumnsObj = {
    default: 4, // 4 columns for large screens
    1024: 3, // 3 columns for tablets
    768: 2, // 2 columns for mobile
    500: 1, // 1 column for small screens
  };

  return (
    <div className="p-4">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="masonry-column"
      >
        {images.map((image, index) => (
          <div key={index} className="relative cursor-pointer mb-4">
            <img
              src={image.src}
              alt={`Image ${index + 1}`}
              className="w-full rounded-lg shadow-md"
              onClick={() => setPreview(image.src)}
            />
          </div>
        ))}
      </Masonry>

      {/* Image Preview Modal */}
      {preview && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative max-w-lg">
            <img src={preview} alt="Preview" className="rounded-lg shadow-lg" />
            <button
              className="absolute top-2 right-2 bg-white text-black p-2 rounded-full"
              onClick={() => setPreview(null)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
