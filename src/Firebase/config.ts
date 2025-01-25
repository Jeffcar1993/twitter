import { initializeApp, FirebaseApp } from "firebase/app";

import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjE4m4VkHJ9Cz7G4Ter08sAPgJO-YqRiQ",
  authDomain: "twitter-ca6b8.firebaseapp.com",
  projectId: "twitter-ca6b8",
  storageBucket: "twitter-ca6b8.firebasestorage.app",
  messagingSenderId: "938178475295",
  appId: "1:938178475295:web:0f5b7c27832521d723ec2a",
  measurementId: "G-BFG5X9V76J",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export default app;


export const db: Firestore = getFirestore(app);
