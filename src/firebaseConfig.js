import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmiY5TcpBwajbeUTX3rW-mC2MzZ-ZmNfw",
  authDomain: "fir-d6d5a.firebaseapp.com",
  projectId: "fir-d6d5a",
  storageBucket: "fir-d6d5a.firebasestorage.app",
  messagingSenderId: "850916258706",
  appId: "1:850916258706:web:8f0f7fd90d07afdae7874b",
  measurementId: "G-CVCE8TMZ6E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User signed in with Google:", result.user);
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};
