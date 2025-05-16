import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Button from '../common/Button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onNewBooking: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onNewBooking }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <form onSubmit={handleSearch} className="relative flex w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-lime-green focus:border-transparent"
        />
        <button 
          type="submit" 
          className="bg-lime-green hover:bg-lime-green-dark text-white px-4 py-2 rounded-r-md transition-colors duration-200"
        >
          Search
        </button>
      </form>
      <Button onClick={onNewBooking} variant="primary">
        New Booking
      </Button>
    </div>
  );
};

export default SearchBar;