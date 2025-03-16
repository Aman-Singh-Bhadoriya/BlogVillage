import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const getRelatedPosts = async (categoryId, currentPostId) => {
  try {
    const q = query(
      collection(db, "posts"),
      where("categoryId", "==", categoryId) // Match category
    );
    const snapshot = await getDocs(q);

    const relatedPosts = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((post) => post.id !== currentPostId) // Exclude the current post
      .slice(0, 4); // Limit to 4 posts

    return relatedPosts;
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
};
