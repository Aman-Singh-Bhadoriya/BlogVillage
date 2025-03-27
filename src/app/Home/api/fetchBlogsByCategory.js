import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const fetchBlogsByCategory = async (categoryId) => {
  if (!categoryId) return [];

  try {
    const blogsRef = collection(db, "posts");
    const q = query(blogsRef, where("categoryId", "==", categoryId));
    const querySnapshot = await getDocs(q);

    const blogs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return blogs;
  } catch (error) {
    console.error("Error fetching category-specific blogs:", error);
    throw error;
  }
};
