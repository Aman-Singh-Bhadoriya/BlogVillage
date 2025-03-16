import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJ2FnVvDRC6xhC0mqFBn6fOslhGD0a24Y",
  authDomain: "village-ca2f7.firebaseapp.com",
  projectId: "village-ca2f7",
  storageBucket: "village-ca2f7.firebasestorage.app",
  messagingSenderId: "857204853377",
  appId: "1:857204853377:web:334a7704c3d63f67669b80"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };