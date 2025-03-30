"use client"
import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function PanoramaShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPanorama, setCurrentPanorama] = useState("");

  const panoramas = [
    {
      id: 1,
      title: "Panorama 1",
      link: "https://www.coohom.com/pub/tool/panorama/aiwalking?obsPlanId=3FO3JKGLSKGB&uri=%2Fpub%2Fsaas%2Fapps%2Fproject%2Fdetail%2F3FO3JKGLSKGB%3Fuid%3D3FO4L57VAC17%26fromTool%3Dtrue&locale=en_US",
      preview: "https://i.pinimg.com/736x/fa/76/62/fa7662fb8721a4fe08b003cc94155bc8.jpg"
    },
    {
      id: 2,
      title: "Panorama 2",
      link: "https://1bhk.flik.in/",
      preview: "https://i.pinimg.com/736x/20/f2/d4/20f2d465442fd574c3d37240231fed9f.jpg"
    },
    {
      id: 3,
      title: "Panorama 3",
      link: "https://www.coohom.com/pub/modelo/viewer/preview/3FO3JKGLSKGB",
      preview: "https://i.pinimg.com/736x/b7/b9/e0/b7b9e03d33ed285c20e5357322762a1a.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">At Flik, we transform ideas into stunning visual experiences.</h1>
      <p className="text-lg text-gray-400 text-center max-w-3xl mb-12">
        Using advanced rendering, cinematic animations, and immersive 360° panoramas, we bring architectural designs to life with precision and realism. Explore spaces like never before—where technology meets imagination.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {panoramas.map((panorama) => (
          <div key={panorama.id} className="bg-gray-800 p-6 text-center rounded-lg shadow-lg overflow-hidden">
            <img src={panorama.preview} alt={panorama.title} className="w-full h-56 object-cover mb-4 rounded-md" />
            <h2 className="text-2xl font-semibold mb-4">{panorama.title}</h2>
            <p className="text-gray-400 mb-6">Experience our 360° visualization.</p>
            <button
              onClick={() => {
                setCurrentPanorama(panorama.link);
                setIsOpen(true);
              }}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-all"
            >
              Explore
            </button>
          </div>
        ))}
      </div>
      
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg max-w-7xl w-full h-[90vh] flex flex-col">
          <iframe src={currentPanorama} className="w-full flex-grow border-none" title="Panorama Experience"></iframe>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg self-center"
          >
            Close
          </button>
        </div>
      </Dialog>
    </div>
  );
}