import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const fetchBlogs = async () => {
  try {
    const snapshot = await getDocs(collection(db, "posts"));
    const blogData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return blogData;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};
