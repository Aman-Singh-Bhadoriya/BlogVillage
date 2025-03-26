"use client";
import HeroContent from "./HeroContent";
import HeroIllustration from "./HeroIllustration";

export default function Hero() {
  return (
    <section id="hero" className="bg-white py-16 md:py-24 lg:px-32">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <HeroContent />
        <HeroIllustration />
      </div>
    </section>
  );
}
