// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnPKlmUUzK4EzOwAtINRu_lu-p7vFmKyI",
  authDomain: "pantry-tracker-e1c90.firebaseapp.com",
  projectId: "pantry-tracker-e1c90",
  storageBucket: "pantry-tracker-e1c90.appspot.com",
  messagingSenderId: "215116152151",
  appId: "1:215116152151:web:bd805f9afe918b208ed212"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);