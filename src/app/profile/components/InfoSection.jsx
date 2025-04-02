import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
export function InfoSection() {
    return (
      <div className="">
        <h1 className="text-3xl md:text-6xl font-bold mb-4 text-left">Hi, I'm Aman Singh</h1>
        <p className="text-xl md:text-2xl mb-6">
          A passionate Web Developer specializing in Next.js and Firebase
        </p>
        <div className="flex gap-4 mb-6 text-2xl">
          <a href="https://github.com/Aman-Singh-Bhadoriya" className="hover:text-indigo-300">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/aman-singh-014bp/" className="hover:text-indigo-300">
            <FaLinkedin />
          </a>
        </div>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-indigo-100">
          View My Work
        </button>
      </div>
    );
  }
  