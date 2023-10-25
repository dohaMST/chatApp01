// Import the functions you need from the SDKs you need
import { initializeApp, signInWithEmailAndPassword } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDtIG9POP2dLrxc0E3xBQczddjc-LYuo00",
  authDomain: "mychatv3.firebaseapp.com",
  projectId: "mychatv3",
  storageBucket: "mychatv3.appspot.com",
  messagingSenderId: "120444340077",
  appId: "1:120444340077:web:454805685b2089500a7c64"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// for signUp || signIn

export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore ();
