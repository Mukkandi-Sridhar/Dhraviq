import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUyVQ3UkD_RoEQqCq6Yr4w8plLQSaoSyg",
  authDomain: "dhraviq.firebaseapp.com",
  projectId: "dhraviq",
  storageBucket: "dhraviq.appspot.com",
  messagingSenderId: "601382865399",
  appId: "1:601382865399:web:3a946b84974e28eb6146f2",
  measurementId: "G-8TS0945GXY"
};

// ✅ Prevent duplicate initialization
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
