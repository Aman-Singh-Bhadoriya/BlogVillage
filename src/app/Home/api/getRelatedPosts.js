import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const getRelatedPosts = async (categoryName, currentPostId) => {
  try {
    let relatedPosts = [];

    if (categoryName) {
      const q = query(
        collection(db, "posts"),
        where("categoryName", "==", categoryName),
        where("status", "==", "active"),
        limit(3)
      );

      const snapshot = await getDocs(q);

      relatedPosts = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((post) => post.id !== currentPostId);
    }

    // ✅ If no related posts found, fetch any active posts
    if (relatedPosts.length === 0) {
      const fallbackQuery = query(
        collection(db, "posts"),
        where("status", "==", "active"),
        limit(3)
      );

      const fallbackSnapshot = await getDocs(fallbackQuery);

      relatedPosts = fallbackSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((post) => post.id !== currentPostId);
    }

    return relatedPosts;
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
};
