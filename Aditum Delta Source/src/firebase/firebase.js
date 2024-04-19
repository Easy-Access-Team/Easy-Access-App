import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getMessaging } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyCCFxEM-hIG7Bl4TBsXl1oWbbF9ays4uBI",
  authDomain: "aditum-delta.firebaseapp.com",
  projectId: "aditum-delta",
  storageBucket: "aditum-delta.appspot.com",
  messagingSenderId: "908407543331",
  appId: "1:908407543331:web:d0dc94822583e6f3ff8396"
};
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const db = getFirestore(app)
const messaging = getMessaging(app);
export {app, firebaseAuth, db, messaging}