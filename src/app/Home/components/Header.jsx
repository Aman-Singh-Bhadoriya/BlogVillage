"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-neutral-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* ✅ Logo */}
          <div className="flex items-center">
            <span className="text-primary-800 dark:text-primary-400 font-bold text-xl">
              BlogSite
            </span>
          </div>

          {/* ✅ Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8 items-center">
            <Link
              href="#"
              className="text-gray-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400 px-1 pt-1 border-b-2 border-transparent hover:border-primary-500 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="#all-blogs"
              className="text-gray-500 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-1 pt-1 border-b-2 border-transparent hover:border-primary-500 text-sm font-medium"
            >
              All Blogs
            </Link>
            <Link
              href="#topics"
              className="text-gray-500 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-1 pt-1 border-b-2 border-transparent hover:border-primary-500 text-sm font-medium"
            >
              Topics
            </Link>
            <Link
              href="#contact"
              className="text-gray-500 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 px-1 pt-1 border-b-2 border-transparent hover:border-primary-500 text-sm font-medium"
            >
              Contact
            </Link>
          </div>

          {/* ✅ Auth Buttons */}
          <div className="hidden md:flex items-center">
            <Link href="#login">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-neutral-800 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-700 transition duration-150 ease-in-out">
                Login
              </button>
            </Link>
            <Link href="#signup">
              <button className="ml-4 px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-white hover:bg-primary-600 transition duration-150 ease-in-out">
                Sign up
              </button>
            </Link>
          </div>

          {/* ✅ Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle main menu"
            >
              {isMobileMenuOpen ? (
                // Close Icon
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Open Icon
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} bg-white dark:bg-neutral-900`}
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="#"
            className="block pl-3 pr-4 py-2 text-base font-medium text-primary-700 dark:text-primary-400 hover:bg-gray-50 dark:hover:bg-neutral-800"
          >
            Home
          </Link>
          <Link
            href="#all-blogs"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-neutral-800"
          >
            All Blogs
          </Link>
          <Link
            href="#topics"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-neutral-800"
          >
            Topics
          </Link>
          <Link
            href="#contact"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-neutral-800"
          >
            Contact
          </Link>
        </div>

        {/* ✅ Mobile Auth Buttons */}
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-neutral-700">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-primary-200 text-primary-600 dark:bg-primary-800 dark:text-primary-300 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <Link href="#login">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-neutral-800 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-700 transition duration-150 ease-in-out">
                  Login
                </button>
              </Link>
              <Link href="#signup">
                <button className="mt-1 px-4 py-2 text-sm font-medium rounded-md bg-primary-500 text-white hover:bg-primary-600 transition duration-150 ease-in-out">
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
