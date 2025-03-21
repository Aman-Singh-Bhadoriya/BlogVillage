export default function CategoryCard({ title, description, icon, link, className }) {
  return (
    <div
      className={`group rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      <div className="py-6 px-5" >
        {/* ✅ Icon */}
        <div className="w-14 h-14  flex items-center justify-center mb-6">
          {icon}
        </div>

        {/* ✅ Title */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>

        {/* ✅ Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {description}
        </p>

        {/* ✅ Explore Link */}
        <a
          href={link}
          className="text-blue-500 dark:text-blue-400 font-medium flex items-center hover:text-blue-700"
        >
          Explore
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
