export default function HeroStats() {
  return (
    <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-white/80 dark:bg-neutral-800/80 rounded-lg p-4 backdrop-blur-sm">
        <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">500+</p>
        <p className="text-gray-600 dark:text-gray-300">Articles</p>
      </div>
      <div className="bg-white/80 dark:bg-neutral-800/80 rounded-lg p-4 backdrop-blur-sm">
        <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">50k+</p>
        <p className="text-gray-600 dark:text-gray-300">Readers</p>
      </div>
      <div className="bg-white/80 dark:bg-neutral-800/80 rounded-lg p-4 backdrop-blur-sm col-span-2 md:col-span-1">
        <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">25+</p>
        <p className="text-gray-600 dark:text-gray-300">Categories</p>
      </div>
    </div>
  );
}
