"use client";

import { useEffect, useState } from "react";
import { Client, Storage } from "appwrite";

const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1"; // e.g., "https://cloud.appwrite.io/v1"
const PROJECT_ID = "67b62ed30029ad7318f3";
const BUCKET_ID = "67b6345f003582f36cc6";

const GlyImg = () => {
  const [images, setImages] = useState<string[]>([]);
  const client = new Client();
  const storage = new Storage(client);

  client.setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Get all files in the bucket
        const files = await storage.listFiles(BUCKET_ID);
        
        // Generate URLs for each image
        const imageUrls = files.files
          .filter(file => file.mimeType.startsWith("image")) // Only fetch images
          .map(file => storage.getFilePreview(BUCKET_ID, file.$id));

        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {images.length > 0 ? (
        images.map((url, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden p-2">
            <img 
              src={url.toString()} 
              alt={`Image ${index}`} 
              className="w-full h-auto aspect-[4/3] object-cover rounded-md"
            />
          </div>
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500">No images found.</p>
      )}
    </div>
  );
};

export default GlyImg;
