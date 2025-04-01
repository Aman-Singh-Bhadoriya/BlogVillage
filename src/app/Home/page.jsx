import FeaturedBlogs from "./components/FeaturedBlogs";
import GetinTouch from "./components/Get In Touch";
import Hero from "./components/Hero";
import Topics from "./components/Topics";
import MyEventCalendar from "./components/Calendar";

export default function Page() {
  return (
    <div className=" bg-white w-full">
      <Hero />
      <FeaturedBlogs/>
      <Topics/>
      <GetinTouch/>
    </div>
  );
}
