// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-f9ddd.firebaseapp.com",
    projectId: "mern-auth-f9ddd",
    storageBucket: "mern-auth-f9ddd.firebasestorage.app",
    messagingSenderId: "609279031553",
    appId: "1:609279031553:web:03a756083a6e2c4ee90300"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);