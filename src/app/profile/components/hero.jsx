import { InfoSection } from "./InfoSection";
import { ImageSection } from "./ImageSection";

export default function Hero() {
  return (
    <div className="px-32 min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <InfoSection />
        <ImageSection />
      </div>
    </div>
  );
}
