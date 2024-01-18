// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfOQ709jI1almxCXI_oFynpPqTg1_YHMs",
  authDomain: "simplify-s.firebaseapp.com",
  projectId: "simplify-s",
  storageBucket: "simplify-s.appspot.com",
  messagingSenderId: "913479133678",
  appId: "1:913479133678:web:126d5746c13898e0f3c6ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);