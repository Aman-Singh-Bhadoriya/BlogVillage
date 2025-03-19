"use client";
import HeroContent from "./HeroContent";
import HeroIllustration from "./HeroIllustration";

export default function Hero() {
  return (
    <section id="hero" className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-800 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <HeroContent />
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
