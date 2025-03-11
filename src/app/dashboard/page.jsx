"use client";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { useRouter } from "next/navigation";
// import DashboardLayout from "./layout";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/auth/login"); // Redirect if not logged in
      } else {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!user) return <p>Loading...</p>; // Prevents null error

  return (
    <div className="">
      <div className="flex w-[230px] bg-[] rounded-4xl items-center gap-1 border border-gray-400 py-1 px-2  overflow-hidden">
        <img
          className="object-cover h-8 w-8 rounded-full pr-2"
          src={user?.photoURL}
        ></img>
        <h2 className="text-2xl font-semibold line-clamp-1 max-w-[150px]">
          {user?.displayName || "User"}!
        </h2>
      </div>
      <p className="text-gray-600 mt-2">
        Manage your blog posts and account settings here.
      </p>
    </div>
  );
}
