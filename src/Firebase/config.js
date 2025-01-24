// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjE4m4VkHJ9Cz7G4Ter08sAPgJO-YqRiQ",
  authDomain: "twitter-ca6b8.firebaseapp.com",
  projectId: "twitter-ca6b8",
  storageBucket: "twitter-ca6b8.firebasestorage.app",
  messagingSenderId: "938178475295",
  appId: "1:938178475295:web:0f5b7c27832521d723ec2a",
  measurementId: "G-BFG5X9V76J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);