import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen flex justify-center items-center">
      <h1>
        <a
          href={`/Home`}
          className="lg:px-16 px-3 py-8 bg-red-500 border rounded-3xl l:text-3xl text-xl text-white"
          aria-label={`Read more about`}
        >
          Welcome: Click for starting
        </a>
      </h1>
    </div>
  );
}
