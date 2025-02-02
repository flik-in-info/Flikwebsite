import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true" // Improves accessibility
      >
        <source src="https://files.catbox.moe/cec6nu.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Modern Architecture Studio
        </h1>
        <p className="text-xl md:text-2xl mb-6">CREATING SPACES THAT INSPIRE</p>
        <button
          className="bg-green-900 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Make in Workflow
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
