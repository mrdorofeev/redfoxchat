import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7vAAnqvHVxBMGNoo9yTv6nxhxEF8pKew",
  authDomain: "red-fox-chat.firebaseapp.com",
  projectId: "red-fox-chat",
  storageBucket: "red-fox-chat.appspot.com",
  messagingSenderId: "662244671212",
  appId: "1:662244671212:web:2181e72a3029c57eac6fc9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore()

export const provider = new GoogleAuthProvider();


