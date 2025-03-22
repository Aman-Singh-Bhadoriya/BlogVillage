import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

// ✅ Get User Info
export const getUserInfo = async (userId) => {
  if (!userId) throw new Error("User ID is required");

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    throw new Error("User not found");
  }
};

// ✅ Update User Info (Merges with existing data)
export const updateUserInfo = async (userId, data) => {
  if (!userId) throw new Error("User ID is required");

  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, data); // Only updates the specified fields
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile");
  }
};

// ✅ Create User Info (Only if the user doc doesn't exist)
export const createUserInfo = async (userId, data) => {
  if (!userId) throw new Error("User ID is required");

  const userRef = doc(db, "users", userId);

  try {
    await setDoc(userRef, data, { merge: true }); // Merge to avoid overwriting existing fields
    return { success: true, message: "Profile created successfully" };
  } catch (error) {
    console.error("Error creating profile:", error);
    throw new Error("Failed to create profile");
  }
};
