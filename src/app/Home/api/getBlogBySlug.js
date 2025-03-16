import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";

export const getBlogBySlug = async (slug) => {
  if (!slug) throw new Error("Slug is required");

  try {
    // console.log(`Fetching blog with slug: ${slug}`);
    const q = query(collection(db, "posts"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const blog = querySnapshot.docs[0].data();
      // console.log("Blog data fetched:", blog);
      return { id: querySnapshot.docs[0].id, ...blog };
    } else {
      // console.warn("No blog found with slug:", slug);
      return null;
    }
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    throw new Error("Failed to fetch blog");
  }
};
