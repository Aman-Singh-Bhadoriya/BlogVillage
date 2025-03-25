import Link from 'next/link';
import BlogList from '../components/BlogList';

const FeaturedBlogs = ({ blogs }) => {
  return (
    <div className='bg-gray-50 dark:bg-neutral-900 w-full'>
    <div className="py-12 bg-primary-light">
      <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Featured Articles</h2>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-serif">
          Discover our most popular and thought-provoking content
        </p>
      </div>
          <BlogList/>
      </div>
    </div>
    </div>
  );
};

export default FeaturedBlogs;
