// /src/app/Home/page.jsx
import BlogList from "./components/BlogList";
import FeaturedBlogs from "./components/FeaturedBlogs";
import Hero from "./components/Hero";

export default function Page() {
  return (
    <div className="pb-16 bg-gray-50 dark:bg-neutral-900 w-full">
      <Hero />
      <FeaturedBlogs/>

    </div>
  );
}
