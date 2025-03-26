export default function HeroStats() {
  return (
    <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-primary-600  rounded-lg py-2 px-6 backdrop-blur-sm col-span-2 md:col-span-1">
        <p className="text-3xl font-bold text-primary-100">50+</p>
        <p className="text-white">Articles</p>
      </div>
      <div className="bg-primary-600  rounded-lg py-2 px-6 backdrop-blur-sm col-span-2 md:col-span-1">
        <p className="text-3xl font-bold text-primary-100">50+</p>
        <p className="text-white">Readers</p>
      </div>
      <div className="bg-primary-600  rounded-lg py-2 px-6 backdrop-blur-sm col-span-2 md:col-span-1">
        <p className="text-3xl font-bold text-primary-100">25+</p>
        <p className="text-white">Categories</p>
      </div>
    </div>
  );
}
