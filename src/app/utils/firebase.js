import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzb95rReNaMSuAKI10Q5drt_RHw0-PSTs",
  authDomain: "blogs-16daa.firebaseapp.com",
  projectId: "blogs-16daa",
  storageBucket: "blogs-16daa.firebasestorage.app",
  messagingSenderId: "244634589300",
  appId: "1:244634589300:web:b70b685589520e16701921",
  measurementId: "G-71B2TPFDE2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };