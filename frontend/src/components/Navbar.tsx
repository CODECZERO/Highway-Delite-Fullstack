import { Link } from 'react-router-dom';
import { MapPin, Search, X } from 'lucide-react';

interface NavbarProps {
  onSearchToggle?: () => void;
  showSearchButton?: boolean;
  isSearchOpen?: boolean;
}

const Navbar = ({ onSearchToggle, showSearchButton = false, isSearchOpen = false }: NavbarProps) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-black rounded-full p-1.5">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-900">highway</span>
              <span className="text-sm font-semibold text-gray-900">delite</span>
            </div>
          </Link>
          {showSearchButton && (
            <button 
              onClick={onSearchToggle}
              className="bg-primary-300 hover:bg-primary-400 active:bg-primary-500 text-gray-900 font-medium px-6 py-2 rounded-lg transition-all duration-150 active:scale-95 flex items-center gap-2"
            >
              {isSearchOpen ? (
                <>
                  <X className="h-4 w-4" />
                  <span>Close</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
