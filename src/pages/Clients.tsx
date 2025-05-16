import React, { useState } from 'react';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import Pagination from '../components/common/Pagination';
import { customers, pets } from '../data/mockData';

interface ClientsProps {
  onViewProfile: (id: number) => void;
}

const ITEMS_PER_PAGE = 5;

const Clients: React.FC<ClientsProps> = ({ onViewProfile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const filteredClients = searchQuery
    ? customers.filter(client => 
        client.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : customers;

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getClientPets = (clientId: number) => {
    return pets.filter(pet => pet.ownerId === clientId);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleAddClient = () => {
    const event = new CustomEvent('navigate', { detail: 'add-client' });
    window.dispatchEvent(event);
  };
  const handleBookAppointment = () => {
    const event = new CustomEvent('navigate', { detail: 'new-booking' });
    window.dispatchEvent(event);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Clients</h1>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative flex w-full max-w-md">
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <Button variant="primary" onClick={handleAddClient}>
          Add Client
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {paginatedClients.map(client => {
          const clientPets = getClientPets(client.id);
          
          return (
            <div key={client.id} className="border-b border-gray-100 last:border-b-0">
              <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar initials={client.avatar} size="md" />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-800">{client.name}</h3>
                      <p className="text-gray-500">Client ID: {client.id}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewProfile(client.id)}
                    >
                      View Profile
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleBookAppointment}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </div>
                
                {clientPets.length > 0 && (
                  <div className="mt-4 pl-14">
                    <p className="text-sm font-medium text-gray-700 mb-2">Pets:</p>
                    <div className="flex flex-wrap gap-2">
                      {clientPets.map(pet => (
                        <div key={pet.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                          <Avatar initials={pet.avatar} size="sm" />
                          <span className="ml-2 text-sm font-medium">{pet.name} ({pet.type})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
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

export default Clients;