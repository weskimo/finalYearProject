import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc } from "firebase/firestore";
import { getStorage , ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkRKmNY7if3q5z2_pMC7kEn50CMy1McAE",
  authDomain: "esportsteammanagement.firebaseapp.com",
  projectId: "esportsteammanagement",
  storageBucket: "esportsteammanagement.appspot.com",
  messagingSenderId: "64960786238",
  appId: "1:64960786238:web:952f7550816303a488066f",
  measurementId: "G-MR2S1WWCTJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const authent = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

 