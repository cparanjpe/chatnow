// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
import env from "react-dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.API_URL,
  authDomain: "chatapp-e8da7.firebaseapp.com",
  projectId: "chatapp-e8da7",
  storageBucket: "chatapp-e8da7.appspot.com",
  messagingSenderId: "578506666459",
  appId: "1:578506666459:web:f77a6d593e2d3d3ad777fe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();