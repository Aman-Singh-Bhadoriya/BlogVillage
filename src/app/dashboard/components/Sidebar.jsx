"use client";
import { usePathname } from "next/navigation";
import { Gauge, Layers2, LayoutList, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user } = useAuth(); // Get user info from context

  const menuItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <Gauge size={20} />,
      roles: ["admin", "author", "reader"], // Everyone can see Dashboard
    },
    {
      name: "Posts",
      link: "/dashboard/posts",
      icon: <LayoutList size={20} />,
      roles: ["admin", "author"], // Admin and Author can see Posts
    },
    {
      name: "Categories",
      link: "/dashboard/categories",
      icon: <Layers2 size={20} />,
      roles: ["admin"], // Only Admin can see Categories
    },
    {
      name: "Authors",
      link: "/dashboard/users",
      icon: <User size={20} />,
      roles: ["admin"], // Only Admin can see Authors
    },
  ];

  return (
    <aside className="w-[250px] bg-blue-500 h-screen p-5">
      <h2 className="text-lg font-bold text-white mb-4 flex items-center">Admin Panel</h2>
      
      <ul className="w-full flex flex-col gap-3">
        {menuItems
          .filter((item) => item.roles.includes(user?.role)) // Filter based on user role
          .map((item, index) => (
            <Link href={item.link} key={index}>
              <li
                className={`flex items-center gap-3 rounded-lg px-4 py-2 transition ${
                  pathname === item.link
                    ? "bg-green-500 text-white"
                    : "bg-blue-50 hover:bg-blue-100"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </li>
            </Link>
          ))}
      </ul>
    </aside>
  );
}
