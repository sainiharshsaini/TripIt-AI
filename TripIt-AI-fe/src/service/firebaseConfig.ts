import { initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore"

const firebaseConfig: FirebaseOptions = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "gen-lang-client-0162341688.firebaseapp.com",
    projectId: "gen-lang-client-0162341688",
    storageBucket: "gen-lang-client-0162341688.firebasestorage.app",
    messagingSenderId: "898686263296",
    appId: "1:898686263296:web:63894e7f855a6ab3a6b8e5",
    measurementId: "G-YSHJLH18W1"
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);