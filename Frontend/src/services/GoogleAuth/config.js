// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {FacebookAuthProvider, getAuth,GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_FIREBASE_KEY,
  authDomain: "socially-fe3e9.firebaseapp.com",
  projectId: "socially-fe3e9",
  storageBucket: "socially-fe3e9.firebasestorage.app",
  messagingSenderId: "694565513619",
  appId: "1:694565513619:web:3d8289aa5dc39ae5042066",
  measurementId: "G-2GS7LRT5QB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider1 = new GoogleAuthProvider()
const provider2 = new FacebookAuthProvider()

export {auth,provider1,provider2}
