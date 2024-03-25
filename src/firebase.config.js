// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEkyyWBcoGyCOXmSlpuQloeh5X5VBuARs",
  authDomain: "house-marketplace-250f0.firebaseapp.com",
  projectId: "house-marketplace-250f0",
  storageBucket: "house-marketplace-250f0.appspot.com",
  messagingSenderId: "142016618213",
  appId: "1:142016618213:web:2613cc6fa47ea4420a7e0c",
  measurementId: "G-2KFYLKVY65",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();
