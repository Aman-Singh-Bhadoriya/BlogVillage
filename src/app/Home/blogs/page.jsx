import BlogList from "../components/BlogList";

export default function Page() {
  return (
    <div className="bg-gray-50  w-full lg:px-32 px-6">
      <div className="text-center lg:py-12 py-8">
        <h2 className="text-4xl md:text-4xl font-bold text-gray-700 ">
          Articles
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Discover our most popular and thought-provoking content
        </p>
      </div>
      <BlogList/>
    </div>
  );
}
