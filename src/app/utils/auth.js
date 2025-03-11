import { auth } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";

// Signup function
export const signUp = async (email, password, fullName, mobile) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user's display name
    await updateProfile(user, { displayName: fullName });

    // Optionally, store the mobile number in Firestore (future improvement)
    return user;
  } catch (error) {
    throw error;
  }
};

// Sign In with Email & Password
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign In with Google
export const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};
// Logout function
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
