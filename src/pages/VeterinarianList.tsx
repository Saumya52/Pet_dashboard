import React, { useState } from 'react';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import Pagination from '../components/common/Pagination';
import { veterinarians } from '../data/mockData';

interface VeterinarianListProps {
  onViewProfile: (id: number) => void;
}

const ITEMS_PER_PAGE = 6;

const VeterinarianList: React.FC<VeterinarianListProps> = ({ onViewProfile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const filteredVets = searchQuery
    ? veterinarians.filter(vet => 
        vet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vet.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : veterinarians;

  const totalPages = Math.ceil(filteredVets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedVets = filteredVets.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleAddVet = () => {
    const event = new CustomEvent('navigate', { detail: 'add-vet' });
    window.dispatchEvent(event);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Veterinarian List</h1>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative flex w-full max-w-md">
          <input
            type="text"
            placeholder="Search veterinarians..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <Button variant="primary" onClick={handleAddVet}>
          Add Veterinarian
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedVets.map(vet => (
          <div key={vet.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-transform duration-300 hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <Avatar initials={vet.avatar} size="lg" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">{vet.name}</h3>
                <p className="text-emerald-600">{vet.specialization}</p>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-gray-600 mb-2">
                <span className="font-medium text-gray-700">Email: </span>
                <a href={`mailto:${vet.email}`} className="text-blue-500 hover:text-blue-700">{vet.email}</a>
              </p>
              <div className="flex justify-between mt-4">
                <Button variant="outline" size="sm">Schedule</Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => onViewProfile(vet.id)}
                >
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default VeterinarianList;