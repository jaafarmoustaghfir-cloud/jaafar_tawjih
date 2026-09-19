// src/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAI5wnf_jPqWywwTCmiX4wMRE8zKDkbPTI",
  authDomain: "jaafartawjih.firebaseapp.com",
  projectId: "jaafartawjih",
  storageBucket: "jaafartawjih.firebasestorage.app",
  messagingSenderId: "153023845327",
  appId: "1:153023845327:web:b54ec8cb2039d28e1cf8ba",
  measurementId: "G-YEEGKEC9VE"
};

// Initialize Firebase safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
