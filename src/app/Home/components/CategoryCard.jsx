export default function CategoryCard({
  title,
  description,
  icon,
  link,
  className,
}) {
  return (
    <div
      className={`group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      <div className="py-5 px-4 flex flex-col h-full">
        {/* ✅ Icon */}
        <div className="w-14 h-14 flex items-center justify-center mb-4">
          {icon}
        </div>

        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>

        <p className="text-white mb-4 flex-grow">{description}</p>

        {/* ✅ Button fixed at the bottom */}
        <div className="mt-auto">
          <a
            href={link}
            className="text-gray-700 hover:text-gray-50 hover:bg-slate-700 bg-white p-2 border rounded-3xl font-medium flex items-center justify-center transition"
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
    </div>
  );
}
