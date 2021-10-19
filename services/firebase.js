import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjofIQyJpSQ_WsdjjE-AdyuuLLx500X_0",
  authDomain: "booksfinder-327307.firebaseapp.com",
  dataBaseURL: "https://booksfinder-327307-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "booksfinder-327307",
  storageBucket: "booksfinder-327307.appspot.com",
  messagingSenderId: "184148479101",
  appId: "1:184148479101:web:d8afb326d9c5f25cc87514"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);