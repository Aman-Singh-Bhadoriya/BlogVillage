"use client";
import DOMPurify from "dompurify";

export default function BlogCard({ blog, index }) {
  const isEven = index % 2 === 0;
  const bgGradient = isEven
    ? "from-green-100 to-green-300" 
    : "from-red-100 to-red-300";
  const circleColor = isEven ? "bg-green-700/100" :  "bg-red-700/100";
  const iconBg = isEven ? "bg-green-500" : "bg-red-500";
  const textColor = isEven ? "text-green-900" : "text-red-900";

  return (
    <div
      className={`group bg-gradient-to-br ${bgGradient} rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 relative`}
    >
      {/* Floating Circle */}
      {/* <div className={`absolute top-0 right-0 w-32 h-32 ${circleColor} rounded-full -mr-16 -mt-16`}></div> */}

      <div className="p-8 relative">
        <h3 className="text-2xl font-bold text-gray-700  mb-3 truncate">{blog.title}</h3>
        <p
          className="text-gray-600  mb-6 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize((blog.content || "").slice(0, 420)) + "...",
          }}
        />

        {/* Footer - Date & Read More */}
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${textColor}`}>{blog.date}</span>

          <a
            href={`/Home/${blog.slug}`}
            className={`font-medium flex items-center ${textColor} transition-colors`}
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
