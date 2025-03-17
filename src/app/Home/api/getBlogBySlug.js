import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const getBlogBySlug = async (slug) => {
  if (!slug) throw new Error("Slug is required");

  try {
    const q = query(collection(db, "posts"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      let blog = querySnapshot.docs[0].data();
      const id = querySnapshot.docs[0].id;

      // If there's an image path, get the download URL
      if (blog.imagePath) {
        const storage = getStorage();
        const imageRef = ref(storage, blog.imagePath);
        blog.imageUrl = await getDownloadURL(imageRef); // Fetch high-res image
      }

      return { id, ...blog };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    throw new Error("Failed to fetch blog");
  }
};
