"use client"
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch('https://demo.tigmoo.com/api/homepage/sections')
      .then((res) => res.json())
      .then((data) => setSections(data));
  }, []);

  return (
    <div className="p-6">
      {sections.map((section) => (
        <div key={section.id} className="mb-10">
          {/* Optional: Display section title */}
          {/* <h2 className="text-xl font-bold mb-3">{section.name}</h2> */}

          <div className={`grid gap-4 grid-cols-${section.no_of_columns || 1}`}>
            {section.items.map((item, i) => (
              <div
                key={i}
                className={`col-span-${item.no_of_columns || 1} bg-white shadow-md rounded-md mb-5`}
              >
                <div className="p-5 pb-0 border-b inline-block w-full">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  {item.link?.url && (
                    <a
                      href={item.link.url}
                      className="text-blue-500 text-sm hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.link.title || 'View More'}
                    </a>
                  )}
                </div>

                {item.type === 'category' && item.data && item.data.length > 0 && (
                  <ul className="p-5 grid grid-cols-2 gap-4">
                    {item.data.map((cat) => (
                      <li
                        key={cat.id}
                        className="border border-gray-300 rounded-md shadow-sm p-3"
                      >
                        {cat.name}
                      </li>
                    ))}
                  </ul>
                )}

                {item.type === 'image' && item.image?.thumbnail && (
                  <img
                    src={item.image.thumbnail}
                    alt={item.title}
                    className="mt-2 max-w-full"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
