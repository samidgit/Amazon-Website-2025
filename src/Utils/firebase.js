import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClsmSikVFxLL6rjiuB9K5XaxhAbv1nV9Y",
  authDomain: "backend2025-773c6.firebaseapp.com",
  projectId: "backend2025-773c6",
  storageBucket: "backend2025-773c6.firebasestorage.app",
  messagingSenderId: "125024251000",
  appId: "1:125024251000:web:be921c80ebc509b0f9d18d",
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();