import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// 🔥 Replace with your Firebase config (from Firebase Console)
  const firebaseConfig = {
    apiKey: "AIzaSyDIb83L7_XfpdXpfs3XGSO8zgVUWnP8FMY",
    authDomain: "alzhiemer-83b13.firebaseapp.com",
    projectId: "alzhiemer-83b13",
    storageBucket: "alzhiemer-83b13.firebasestorage.app",
    messagingSenderId: "995301668398",
    appId: "1:995301668398:web:5138558e47bb87324711bf",
    measurementId: "G-2G63DCF8MS"
  };

// ✅ Ensure Firebase is only initialized once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// 🔥 Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
