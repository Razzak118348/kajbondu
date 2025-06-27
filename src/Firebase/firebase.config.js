// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1MZ1SkLi2tqRKoBOUYPiAMpmM_ByTkvk",
  authDomain: "kajbondu.firebaseapp.com",
  projectId: "kajbondu",
  storageBucket: "kajbondu.firebasestorage.app",
  messagingSenderId: "734942151931",
  appId: "1:734942151931:web:b9dd4517b5e6e4bf6b5c5e",
  measurementId: "G-2E36VX1PBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app ; analytics;