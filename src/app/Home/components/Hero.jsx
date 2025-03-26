"use client";
import HeroContent from "./HeroContent";
import HeroIllustration from "./HeroIllustration";

export default function Hero() {
  return (
    <section id="hero" className="bg-white py-12 lg:py-24 px-6 lg:px-32">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <HeroContent />
        <div className="hidden lg:block">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
