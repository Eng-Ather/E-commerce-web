// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyCx0ro-GkwHigXlEUfpHou_KYxOkruy3AM",
  authDomain: "ather-ali-store.firebaseapp.com",
  projectId: "ather-ali-store",
  storageBucket: "ather-ali-store.appspot.com",
  messagingSenderId: "570899576420",
  appId: "1:570899576420:web:0a190221dc1329b4405171",
  measurementId: "G-7S4JCS6Z7M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Export
export {app, auth};
