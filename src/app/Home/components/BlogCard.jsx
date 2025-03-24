"use client";
import DOMPurify from "dompurify";

export default function BlogCard({ blog, index }) {
  const isEven = index % 2 === 0;
  const bgGradient = isEven
    ? "from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30"
    : "from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30";
  const circleColor = isEven ? "bg-red-400/20 dark:bg-red-600/20" : "bg-green-400/20 dark:bg-green-600/20";
  const iconBg = isEven ? "bg-red-500 dark:bg-red-600" : "bg-green-500 dark:bg-green-600";
  const textColor = isEven ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400";
  const hoverTextColor = isEven ? "hover:text-red-800 dark:hover:text-red-300" : "hover:text-green-800 dark:hover:text-green-300";

  return (
    <div
      className={`group bg-gradient-to-br ${bgGradient} rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative`}
    >
      {/* Floating Circle */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${circleColor} rounded-full -mr-16 -mt-16`}></div>

      <div className="p-8 relative">
        {/* Icon */}
        

        {/* Blog Title */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 truncate">{blog.title}</h3>

        {/* Blog Description */}
        <p
          className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize((blog.content || "").slice(0, 420)) + "...",
          }}
        />

        {/* Footer - Date & Read More */}
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${textColor}`}>{blog.date}</span>

          <a
            href={`/Home/${blog.slug}`}
            className={`font-medium flex items-center ${textColor} ${hoverTextColor} transition-colors`}
          >
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
