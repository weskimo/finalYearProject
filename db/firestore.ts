import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getFirestore } from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyBkRKmNY7if3q5z2_pMC7kEn50CMy1McAE",
    authDomain: "esportsteammanagement.firebaseapp.com",
    projectId: "esportsteammanagement",
    storageBucket: "esportsteammanagement.appspot.com",
    messagingSenderId: "64960786238",
    appId: "1:64960786238:web:952f7550816303a488066f",
    measurementId: "G-MR2S1WWCTJ"
  };

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

 