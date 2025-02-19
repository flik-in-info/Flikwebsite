"use client";

import { useEffect, useState } from "react";
import { Client, Storage } from "appwrite";

const APPWRITE_ENDPOINT = "https://cloud.appwrite.io/v1";
const PROJECT_ID = "67b62ed30029ad7318f3";
const BUCKET_ID = "67b6345f003582f36cc6";

const GlyVid = () => {
  const [videos, setVideos] = useState<{ id: string; preview: string; url: string }[]>([]);
  const client = new Client();
  const storage = new Storage(client);

  client.setEndpoint(APPWRITE_ENDPOINT).setProject(PROJECT_ID);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const files = await storage.listFiles(BUCKET_ID);

        const videoData = files.files
          .filter(file => file.mimeType.startsWith("video"))
          .map(file => ({
            id: file.$id,
            preview: storage.getFilePreview(BUCKET_ID, file.$id, 640, 360),
            url: storage.getFileView(BUCKET_ID, file.$id)
          }));

        setVideos(videoData);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const openVideoInNewTab = (videoUrl: string) => {
    window.open(videoUrl, "_blank");
  };

  return (
    <div className="relative">
      {/* Video Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {videos.length > 0 ? (
          videos.map(video => (
            <div 
              key={video.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => openVideoInNewTab(video.url)}
            >
              <img 
                src={video.preview} 
                alt="Video thumbnail" 
                className="w-full aspect-video object-cover rounded-md"
              />
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No videos found.</p>
        )}
      </div>
    </div>
  );
};

export default GlyVid;
