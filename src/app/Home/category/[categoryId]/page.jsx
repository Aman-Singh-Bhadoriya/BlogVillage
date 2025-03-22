"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import BlogList from "../../components/BlogList"; // Create this component for blog display

export default function CategoryBlogsPage() {
    const { categoryId } = useParams();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const q = query(
                    collection(db, "blogs"),
                    where("categoryId", "==", categoryId)
                );
                const querySnapshot = await getDocs(q);
                const blogsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setBlogs(blogsData);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            fetchBlogs();
        }
    }, [categoryId]);

    if (loading) {
        return <p className="text-center text-gray-500">Loading blogs...</p>;
    }

    return (
        <div className="py-12 bg-gray-50 dark:bg-neutral-900">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    Blogs under {categoryId}
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <BlogList
                        key={blog.id}
                        title={blog.title}
                        excerpt={blog.excerpt}
                        image={blog.image}
                        link={`/blog/${blog.slug}`}
                    />
                ))}
            </div>
        </div>
    );
}
