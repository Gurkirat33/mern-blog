// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-2406a.firebaseapp.com",
  projectId: "mern-blog-2406a",
  storageBucket: "mern-blog-2406a.appspot.com",
  messagingSenderId: "78337452657",
  appId: "1:78337452657:web:adbfcace0642a687e309d0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
