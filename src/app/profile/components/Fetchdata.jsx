import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function FetchDataWithAxios() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "https://demo.tigmoo.com/api/homepage/sections";

    axios
      .get(apiUrl)
      .then((response) => setData(response.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Extract Sections
  const bestOfElectronics = data.find(item => item.name === "Best Of Electronics");
  const tvs = data.find(item => item.items?.some(subItem => subItem.title === "TVs"));
  const fashion = data.find(item => item.items?.some(subItem => subItem.title === "Fashion"));
  const samsungS25 = data.find(item => item.items?.some(subItem => subItem.title === "Samsung S25"));

  return (
    <div>
      <div className="bg-[#f0f5ff] p-5">

        {/* ✅ Best Of Electronics Section */}
        {bestOfElectronics && (
          <div className="w-100 bg-[#ffffff] shadow-md rounded-md mb-5">
            {bestOfElectronics.items?.map((item, index) => (
              <div key={index}>
                <div className="p-5 pb-0 border-1 inline-block w-full">
                  <h3 className="float-left">{item.title}</h3>
                  <Link href={item.link?.url || "#"} className="float-right text-sm flex">
                    {item.link?.title || "No Link Available"}
                  </Link>
                </div>
                <div className="p-5 w-100 grid grid-cols-6 gap-4">
                  {Array.isArray(item.data) && item.data.length > 0 ? (
                    item.data.map((product, index) => (
                      <div key={index} className="border border-[#dadada] rounded-md shadow-sm p-3">
                        <Link href="#">
                          <div className="h-[170px] flex justify-items-center">
                            <img
                              className="object-contain"
                              src={product.image || "https://via.placeholder.com/150"}
                              alt={product.name}
                            />
                          </div>
                          <div className="text-center">
                            <p>{product.name}</p>
                            <h6 className="text-[#108934]">
                              {product.details || "No details available"}
                            </h6>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p>No products available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ TVs Section */}
        {tvs && (
          <div className="w-100 bg-[#ffffff] shadow-md rounded-md">
            {tvs.items?.map((item, index) => (
              <div key={index}>
                <div className="p-5 pb-0 border-1 inline-block w-full">
                  <h3 className="float-left">{item.title}</h3>
                  <Link href={item.link?.url || "#"} className="float-right text-sm flex">
                    {item.link?.title || "No Link Available"}
                  </Link>
                </div>
                <div className="p-5 w-100 grid grid-cols-2 gap-4">
                  {Array.isArray(item.data) && item.data.length > 0 ? (
                    item.data.map((product, index) => (
                      <div key={index} className="border border-[#dadada] rounded-md shadow-sm p-3">
                        <Link href="#">
                          <img
                            className="object-contain h-[170px]"
                            src={product.image || "https://via.placeholder.com/150"}
                            alt={product.name}
                          />
                          <div className="text-center">
                            <p>{product.name}</p>
                            <h6 className="text-[#108934]">{product.details || "No details available"}</h6>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p>No TVs available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Fashion Section */}
        {fashion && (
          <div className="w-100 bg-[#ffffff] shadow-md rounded-md">
            {fashion.items?.map((item, index) => (
              <div key={index}>
                {item.data?.map((product, index) => (
                  <div key={index} className="p-5 border border-[#dadada] rounded-md shadow-sm">
                    <img
                      src={product.image?.[0]?.original || "https://via.placeholder.com/150"}
                      alt={product.name}
                    />
                    <h3>{product.name}</h3>
                  </div>
                ))}
                <div className="p-5 pb-0 border-1 inline-block w-full">
                  <h3 className="float-left">{item.title}</h3>
                  <Link href={item.link?.url || "#"} className="float-right text-sm flex">
                    {item.link?.title || "No Link Available"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Samsung S25 Section */}
        {samsungS25 && (
          <div className="w-100 bg-[#ffffff] shadow-md rounded-md">
            {samsungS25.items?.map((item, index) => (
              <div key={index}>
                <div className="p-5 w-100 grid grid-cols-2 gap-4">
                  {item.image?.map((imageObj, index) => (
                    <div key={index} className="border border-[#dadada] rounded-md shadow-sm p-3">
                      <img src={imageObj.original || "https://via.placeholder.com/150"} alt="Samsung S25" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
