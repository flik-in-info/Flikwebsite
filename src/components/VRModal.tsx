'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVrCardboard, faTimes } from '@fortawesome/free-solid-svg-icons';

interface VRModalProps {
  showVRModal: boolean;
  setShowVRModal: (show: boolean) => void;
  panoramaPosition: { x: number; y: number };
  setPanoramaPosition: (position: { x: number; y: number }) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
}

const VRModal: React.FC<VRModalProps> = ({
  showVRModal,
  setShowVRModal,
  setPanoramaPosition,
  setZoom,
}) => {
  const [isVRMode, setIsVRMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const coohomUrl = "https://www.coohom.com/pub/tool/panorama/aiwalking?obsPlanId=3FO3N9LICGM8&utm_source=pano_share&uri=%2Fpub%2Ftool%2Fbim%2Fcloud%3Fredirectfinish%3Dtrue%26em%3D0%26uid%3D3FO4L57VAC17%26designid%3D3FO3N9LICGM8%26redirecturl%3D%2Fpub%2Fsaas%2Fapps%2Fproject%2Fdetail%2F3FO3N9LICGM8%26locale%3Den_IN&utm_content=3FO3N9LICGM8&utm_medium=qrcode&locale=en_US";

  // Hide cursor when VR modal is shown
  useEffect(() => {
    if (showVRModal) {
      // Dispatch custom event to hide the cursor
      window.dispatchEvent(new Event('hideCustomCursor'));
    } else {
      // Dispatch custom event to show the cursor when modal closes
      window.dispatchEvent(new Event('showCustomCursor'));
    }
  }, [showVRModal]);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  if (!showVRModal) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black">
      <div className="relative w-full h-full overflow-hidden">
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
            <div className="text-white text-center">
              <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
              <p>Loading VR Experience...</p>
            </div>
          </div>
        )}
        
        {/* Iframe containing the external VR experience */}
        <iframe 
          src={coohomUrl}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; camera; gyroscope; microphone; xr-spatial-tracking"
          allowFullScreen
          onLoad={handleIframeLoad}
        ></iframe>

        {/* Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-4 z-20">
          <button
            className="px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all border border-white/20 backdrop-blur-md"
            onClick={() => setIsVRMode(!isVRMode)}
          >
            <FontAwesomeIcon
              icon={faVrCardboard}
              className={`mr-2 ${isVRMode ? 'text-emerald-400' : ''}`}
            />
            VR Mode
          </button>
          <button
            className="px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all border border-white/20 backdrop-blur-md"
            onClick={() => {
              setShowVRModal(false);
              setPanoramaPosition({ x: 0, y: 0 });
              setZoom(1);
              setIsVRMode(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} className="mr-2" />
            Exit Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default VRModal; 