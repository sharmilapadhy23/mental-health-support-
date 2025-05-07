import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBawILYQI-DkZBcBeqXcEtrl9i3uPKNrg4",
  authDomain: "mental-health-support-dc69f.firebaseapp.com",
  projectId: "mental-health-support-dc69f",
  storageBucket: "mental-health-support-dc69f.firebasestorage.app",
  messagingSenderId: "119475233870",
  appId: "1:119475233870:web:e9bc8a6c1a730839a1cf1f",
};
const app = initializeApp(firebaseConfig); // Initialize Firebase
const auth = getAuth(app); // Now you can use Firebase services
export {auth};