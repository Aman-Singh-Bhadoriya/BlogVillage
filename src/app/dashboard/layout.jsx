"use client";
import { AuthProvider } from "../context/AuthContext";
import Header from "./components/Header";
import AdminSidebar from "./components/Sidebar";


export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
    </AuthProvider>
  );
}
