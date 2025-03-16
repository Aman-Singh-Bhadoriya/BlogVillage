export default function Header() {
    return (
      <header className="bg-blue-500 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-lg font-bold">My Blog</div>
  
          {/* Navigation Links */}
          <nav className="flex gap-4">
            <a href="/" className="hover:text-gray-200">Home</a>
            <a href="/about" className="hover:text-gray-200">All Blogs</a>
            <a href="/about" className="hover:text-gray-200">TOPICS</a>
            <a href="/contact" className="hover:text-gray-200">Contact</a>
          </nav>
  
          {/* Social Icons */}
          <div className="flex gap-3">
            <a href="#">🔵</a>
            <a href="#">🔴</a>
            <a href="#">🟠</a>
          </div>
        </div>
      </header>
    );
  }