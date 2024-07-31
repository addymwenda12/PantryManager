// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG-qlinCYdu0CBSiSuV4bHKCeWz8XrH8o",
  authDomain: "pantry-system-e838a.firebaseapp.com",
  projectId: "pantry-system-e838a",
  storageBucket: "pantry-system-e838a.appspot.com",
  messagingSenderId: "218281644024",
  appId: "1:218281644024:web:db19f82971d7e02160500d",
  measurementId: "G-3WXHJ9ZXV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore};