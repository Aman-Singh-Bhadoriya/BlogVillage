"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "../../utils/firebase"; // Make sure this is correctly set up
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/auth/login");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 lg:px-22">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* ✅ Logo */}
          <div className="flex items-center">
            <Link href="/Home">
              <span className="text-primary-600 font-bold text-xl">
                BlogSite
              </span>
            </Link>
          </div>

          {/* ✅ Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8 items-center">
            <Link
              href="/Home"
              className="text-gray-700 hover:text-primary-500 dark:hover:text-primary-400 px-1 pt-1 border-b-2 border-transparent hover:border-primary-500 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/Home/blogs"
              className="text-gray-700 hover:text-primary-500 dark:hover:text-primary-400 px-1 pt-1 border-b-2 border-transparent hover:border-primary-500 text-sm font-medium"
            >
              All Blogs
            </Link>
            <Link
              href="/Home/category"
              className="text-gray-700 hover:text-primary-500 dark:hover:text-primary-400 px-1 pt-1 border-b-2 border-transparent hover:border-primary-500 text-sm font-medium"
            >
              Topics
            </Link>
            <Link
              href="/profile"
              className="text-gray-700 hover:text-primary-500 dark:hover:text-primary-400 px-1 pt-1 border-b-2 border-transparent hover:border-primary-500 text-sm font-medium"
            >
              About Me
            </Link>
            <Link
              href="/Home/Contect"
              className="text-gray-700 hover:text-primary-500 dark:hover:text-primary-400 px-1 pt-1 border-b-2 border-transparent hover:border-primary-500 text-sm font-medium"
            >
              Contact
            </Link>
          </div>

          {/* ✅ Auth/Profile Section */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-4 border  border-white rounded-lg px-5 py-3"
                >
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="ml-2 text-gray-900">
                    {user.displayName || "User"}
                  </span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-150 ease-in-out">
                    Login
                  </button>
                </Link>
                <Link href="/auth/signup">
                  <button className="ml-4 px-4 py-2 text-sm font-medium rounded-md bg-primary-100 text-primary-700 hover:bg-primary-200 transition duration-150 ease-in-out">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* ✅ Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100  focus:outline-none focus:ring-2 focus:ring-inset"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle main menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-16 h-60 w-screen">
          <Link href="/Home" className="block px-4 py-2 text-gray-700">
            Home
          </Link>
          <Link href="/Home/blogs" className="block px-4 py-2 text-gray-700">
            All Blogs
          </Link>
          <Link href="/Home/category" className="block px-4 py-2 text-gray-700">
            Topics
          </Link>
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Deshboard
          </Link>
          <Link href="/Home/Contect" className="block px-4 py-2 text-gray-700">
            Contact
          </Link>
          {user ? (
            <div className="border-t border-gray-200 px-4 py-3">
              <div className="flex items-center">
                {/* <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                /> */}
                <div className="flex justify-between w-full items-center">
                  <p className="text-gray-900 py-2 px-4 border rounded-2xl border-white">
                    {user.displayName || "User"}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-s text-primary-50 hover:text-red-500 rounded-3xl bg-red-600 py-2 px-4"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between px-4 py-3">
              <Link href="/auth/signup">
                <button className="btn-primary bg-gray-200 p-2 rounded-lg">
                  Sign up
                </button>
              </Link>
              <Link href="/auth/login">
                <button className="btn-secondary bg-gray-200 p-2 rounded-lg">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
