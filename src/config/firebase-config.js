// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeaL7nEbZAwwDfGYp3OTm6lD0AjdWJLXQ",
  authDomain: "expense-tracker-37631.firebaseapp.com",
  projectId: "expense-tracker-37631",
  storageBucket: "expense-tracker-37631.appspot.com",
  messagingSenderId: "732836609892",
  appId: "1:732836609892:web:5344fede495fa336814471",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
