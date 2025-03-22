import PerformanceChart from "./components/BarChart";
import FeaturedBlogs from "./components/FeaturedBlogs";
import GetinTouch from "./components/Get In Touch";
import Hero from "./components/Hero";
import Topics from "./components/Topics";

export default function Page() {
  return (
    <div className=" bg-gray-50 dark:bg-neutral-900 w-full">
      <Hero />
      {/* <PerformanceChart /> */}
      <FeaturedBlogs/>
      <Topics/>
      <GetinTouch/>

    </div>
  );
}
