export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4 pt-8">
        <div className="container mx-auto flex justify-between items-center">
          <div>&copy; 2025 My Blog. All rights reserved.</div>
  
          <nav className="flex gap-4">
            <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
            <a href="/terms" className="hover:text-gray-400">Terms of Service</a>
          </nav>
        </div>
      </footer>
    );
  }