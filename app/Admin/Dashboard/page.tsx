/* eslint-disable */

"use client";
import { useState } from "react";
import { databases, storage } from "@/lib/appwrite";
import { ID } from "appwrite";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState("image");

  const handleUpload = async () => {
    try {
      if (!file) return alert("Please select a file");

      // ✅ Upload file to Appwrite Storage
      const uploadedFile = await storage.createFile(
        "67b6345f003582f36cc6", // Your Storage Bucket ID
        ID.unique(),
        file
      );

      if (!uploadedFile) {
        alert("File upload failed!");
        return;
      }

      // ✅ Generate File URL from Appwrite
      const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/67b6345f003582f36cc6/files/${uploadedFile.$id}/view`;

      // ✅ Choose correct collection and attributes
      let collectionId = uploadType === "image"
        ? "67b644820001148d676a" // Replace with the new Image Collection ID
        : "67b644d4000a8f853ed9"; // Replace with the new Video Collection ID

      let data = {
        title,
        ...(uploadType === "image" ? { image_url: fileUrl } : { video_url: fileUrl })
      };

      // ✅ Save File URL & Title in Database
      await databases.createDocument(
        "67b6325b000f7cd79c11", // Your Database ID
        collectionId,
        ID.unique(),
        data
      );

      alert("Upload successful!");
      setTitle("");
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>

      {/* 🔹 Select Image or Video Upload */}
      <select className="border p-2 mb-2" onChange={(e) => setUploadType(e.target.value)}>
        <option value="image">Upload Image</option>
        <option value="video">Upload Video</option>
      </select>

      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 🔹 File Upload Option */}
      <input
        type="file"
        className="border p-2 w-full mb-2"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button onClick={handleUpload} className="bg-green-500 text-white p-2 rounded">
        Upload
      </button>
    </div>
  );
}
