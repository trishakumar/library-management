// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";  // Import Firebase app
import { getFirestore } from "firebase/firestore";  // Import Firestore
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiRhnDjY5tzMAR-LZnfRJvEP6hy4p77XQ",
  authDomain: "bookdb-fee5d.firebaseapp.com",
  projectId: "bookdb-fee5d",
  storageBucket: "bookdb-fee5d.firebasestorage.app",
  messagingSenderId: "547819370172",
  appId: "1:547819370172:web:e9b98e2faac9c35109c2b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore and Auth instances
const db = getFirestore(app);
const auth = getAuth(app);

// Export the instances so you can use them in your components
export { db, auth };