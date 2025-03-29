import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCBcIIj8cH0F1sj1cswwwwS-C99d5ENyoE",
    authDomain: "flikgallery.firebaseapp.com",
    projectId: "flikgallery",
    storageBucket: "flikgallery.firebasestorage.app",
    messagingSenderId: "70008436666",
    appId: "1:70008436666:web:f29839c0177ee7b4f0cf83",
    measurementId: "G-L0LKH3X8LM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
