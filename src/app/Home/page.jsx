import FeaturedBlogs from "./components/FeaturedBlogs";
import Hero from "./components/Hero";
import Topics from "./components/Topics";

export default function Page() {
  return (
    <div className="pb-16 bg-gray-50 dark:bg-neutral-900 w-full">
      <Hero />
      <FeaturedBlogs/>
      <Topics/>
      

    </div>
  );
}
