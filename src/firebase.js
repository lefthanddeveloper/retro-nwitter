import { initializeApp } from "firebase/app";
import * as auth from "firebase/auth";
import * as store from "firebase/firestore";
import * as storage from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,

  //   apiKey: "AIzaSyA3Ic2rMaX2jXFZxb0n4bUGZ2192HbcUO0",
  //   authDomain: "retro-nwitter.firebaseapp.com",
  //   projectId: "retro-nwitter",
  //   storageBucket: "retro-nwitter.appspot.com",
  //   messagingSenderId: "661725137678",
  //   appId: "1:661725137678:web:f365a2182789232835655f",
  //   measurementId: "G-NJ5BTV4BSV",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAppAuth = auth;
export const firebaseAuth = auth.getAuth();
export const firebaseFireStore = store;
export const fireStore = store.getFirestore();
export const firebaseAppStorage = storage;
export const firebaseStorage = storage.getStorage();
