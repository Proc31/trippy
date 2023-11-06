// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvEWdGQw0s-I28ZDDw4w-Yp2lX4pl58lE",
  authDomain: "trippy-fad48.firebaseapp.com",
  databaseURL: "https://trippy-fad48-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "trippy-fad48",
  storageBucket: "trippy-fad48.appspot.com",
  messagingSenderId: "799332098976",
  appId: "1:799332098976:web:61b7d7818f6d789f95bac5",
  measurementId: "G-EDFPJQB6Z3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);