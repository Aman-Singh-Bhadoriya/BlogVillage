import BlogList from './BlogList';

const FeaturedBlogs = ({ blogs }) => {
  return (
    <section className="py-12 lg:px-32 px-12 bg-gray-100">
      <div className="mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-700 ">Featured Articles</h2>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Discover our most popular and thought-provoking content
        </p>
      </div>
          <BlogList/>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
