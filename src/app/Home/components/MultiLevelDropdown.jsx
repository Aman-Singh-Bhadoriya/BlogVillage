export default function MultiLevelDropdown() {
    return (
      <div className="relative inline-block text-left">
        {/* Main Dropdown Button */}
  
        {/* Dropdown Menu */}
        <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md border border-gray-200">
          <ul className="py-2 flex w-full">
            {/* Simple Menu Item */}
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Item 1</li>
  
            {/* Dropdown with Submenu */}
            <li className="relative group">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between">
                Submenu
                <span>▶</span>
              </button>
  
              {/* Submenu */}
              <ul className="absolute  w-48 bg-white shadow-lg rounded-md border border-gray-200 hidden group-hover:block">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Subitem 1
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Subitem 2
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Subitem 3
                </li>
              </ul>
            </li>
  
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Item 3</li>
          </ul>
        </div>
      </div>
    );
  }
  