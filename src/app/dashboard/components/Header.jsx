"use client";
import { useRouter } from "next/navigation";
import { auth } from "../../utils/firebase";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/auth/login");
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </header>
  );
}
