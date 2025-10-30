import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultsCount?: number;
  totalCount?: number;
}

const SearchBar = ({ searchQuery, onSearchChange, resultsCount, totalCount }: SearchBarProps) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, location, or description..."
          className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 active:bg-gray-200 rounded-full p-1 transition-all duration-150 active:scale-90"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      {searchQuery && resultsCount !== undefined && totalCount !== undefined && (
        <div className="mt-2 text-sm text-gray-600">
          Found <span className="font-semibold">{resultsCount}</span> of {totalCount} experiences
        </div>
      )}
    </div>
  );
};

export default SearchBar;
