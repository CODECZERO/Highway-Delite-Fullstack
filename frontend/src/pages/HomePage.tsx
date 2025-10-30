import { useState, useMemo } from 'react';
import { useExperiences } from '../hooks/useExperiences';
import Navbar from '../components/Navbar';
import ExperienceCard from '../components/ExperienceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';
import { Search } from 'lucide-react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Use React Query hook - automatically handles loading, caching, and refetching
  const { data: experiences = [], isLoading, isError, error } = useExperiences();
  
  // Toggle search bar visibility
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery(''); // Clear search when closing
    }
  };

  // Filter experiences based on search query
  const filteredExperiences = useMemo(() => {
    if (!searchQuery.trim()) {
      return experiences;
    }

    const query = searchQuery.toLowerCase();
    return experiences.filter(
      (exp) =>
        exp.title.toLowerCase().includes(query) ||
        exp.location.toLowerCase().includes(query) ||
        exp.description.toLowerCase().includes(query) ||
        exp.category.toLowerCase().includes(query)
    );
  }, [experiences, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        showSearchButton={true}
        isSearchOpen={isSearchOpen}
        onSearchToggle={handleSearchToggle}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Amazing Experiences</h1>
          <p className="text-gray-600 mb-6">Explore curated adventures, cultural tours, and unique activities across India</p>
          
          {/* Search bar with slide-down animation */}
          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isSearchOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              resultsCount={filteredExperiences.length}
              totalCount={experiences.length}
            />
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <div className="text-center py-20">
            <p className="text-red-600 text-lg mb-2">Error loading experiences</p>
            <p className="text-gray-500 text-sm">{error?.message || 'Please try again later'}</p>
          </div>
        ) : filteredExperiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredExperiences.map((experience) => (
              <ExperienceCard key={experience._id} experience={experience} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No experiences found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any experiences matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="bg-primary-300 hover:bg-primary-400 active:bg-primary-500 text-gray-900 font-medium px-6 py-2 rounded-lg transition-all duration-150 active:scale-95"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
