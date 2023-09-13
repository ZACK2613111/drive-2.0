// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDKMhOkV6BAbtPl_hsFGZuMrRqpePxWY5U",
  authDomain: "drive-clone-58f8f.firebaseapp.com",
  databaseURL: "https://drive-clone-58f8f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "drive-clone-58f8f",
  storageBucket: "drive-clone-58f8f.appspot.com",
  messagingSenderId: "87455678034",
  appId: "1:87455678034:web:74b132094608ceda67e98b",
  measurementId: "G-W8DWGN9JKK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const database = getDatabase(app)