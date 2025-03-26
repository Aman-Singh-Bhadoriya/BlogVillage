"use client";
import Link from "next/link";
import HeroStats from "./HeroStats";

export default function HeroContent() {
  return (
    <div className="lg:w-1/2 text-center lg:text-left">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-700 mb-4">
        <span className="block">Discover Inspiring</span>
        <span className="block text-primary-900 ">Ideas & Stories</span>
      </h1>
      <p className="mt-4 text-xl text-gray-600 mb-8">
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
          className="bg-primary-600 text-white hover:bg-primary-700 font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out border border-primary-200 transform hover:-translate-y-1"
        >
          Explore Topics
        </Link>
      </div>

      {/* Include HeroStats */}
      <HeroStats />
    </div>
  );
}
