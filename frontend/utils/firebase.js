// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginvirtualcourses-a2266.firebaseapp.com",
  projectId: "loginvirtualcourses-a2266",
  storageBucket: "loginvirtualcourses-a2266.firebasestorage.app",
  messagingSenderId: "238584169955",
  appId: "1:238584169955:web:4e7140528a9a3f109f8cd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider} 