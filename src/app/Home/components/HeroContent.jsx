"use client";
import Link from "next/link";
import HeroStats from "./HeroStats";

export default function HeroContent() {
  return (
    <div className="lg:w-1/2 text-center lg:text-left">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
        <span className="block">Discover Inspiring</span>
        <span className="block text-primary-600 dark:text-primary-400">Ideas & Stories</span>
      </h1>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 mb-8">
        Explore thought-provoking articles, expert insights, and creative perspectives on our curated blog platform.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <Link
          href="/blogs"
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Start Reading
        </Link>
        <Link
          href="/categories"
          className="bg-white dark:bg-neutral-800 text-primary-600 dark:text-primary-400 hover:bg-gray-100 dark:hover:bg-neutral-700 font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out border border-primary-200 dark:border-neutral-700 transform hover:-translate-y-1"
        >
          Explore Topics
        </Link>
      </div>

      {/* Include HeroStats */}
      <HeroStats />
    </div>
  );
}
