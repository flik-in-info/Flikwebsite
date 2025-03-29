"use client";

import { useState } from "react";

const videoLinks = [
  "https://files.catbox.moe/jo5r7f.mp4",
  "https://files.catbox.moe/jo5r7f.mp4",
  "https://files.catbox.moe/jo5r7f.mp4",
  "https://files.catbox.moe/jo5r7f.mp4",
];

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen bg-gray-900 p-4 text-white">
      {/* Heading and Description */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-500">
          Flik - Bringing Ideas to Life
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mt-2 max-w-2xl mx-auto">
          At Flik, we capture creativity, innovation, and craftsmanship in every
          project we showcase. Explore our collection to see how we bring ideas
          to life with passion and precision
        </p>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-20"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="p-6 rounded-lg w-[90vw] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={selectedVideo}
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-auto max-h-[100vh] rounded-lg"
            />
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute m-4 top-2 right-2 text-white text-xl bg-green-600 px-3 py-1 rounded z-30"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
        {videoLinks.map((video, index) => (
          <div key={index} className="relative group cursor-pointer">
            <div className="w-full h-40 md:h-48 lg:h-56 xl:h-64 overflow-hidden rounded-lg shadow-lg">
              <video
                src={video}
                className="w-full h-full object-cover"
                preload="metadata"
                muted
                onClick={() => setSelectedVideo(video)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
