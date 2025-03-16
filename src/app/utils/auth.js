import { auth, db } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup, 
  updateProfile 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// ✅ Signup function (fixed)
export const signUp = async (email, password, fullName, mobile) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Update user's display name
    await updateProfile(user, { displayName: fullName });

    // ✅ Store user details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      displayName: fullName,
      email,
      mobile,
      role: "reader", // Default role
      createdAt: new Date()
    });

    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// ✅ Sign In with Email & Password
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// ✅ Sign In with Google
export const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Store Google user data in Firestore (if it doesn't already exist)
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        role: "reader", // Default role
        createdAt: new Date()
      },
      { merge: true }
    );

    return user;
  } catch (error) {
    throw error;
  }
};

// ✅ Logout function
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
