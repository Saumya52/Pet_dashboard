import React, { useState } from 'react';
import { Calendar, List } from 'lucide-react';
import SearchBar from '../components/dashboard/SearchBar';
import AppointmentTable from '../components/dashboard/AppointmentTable';
import Pagination from '../components/common/Pagination';
import { 
  appointments, 
  customers, 
  pets, 
  veterinarians 
} from '../data/mockData';

const ITEMS_PER_PAGE = 5;

const VeterinaryBookings: React.FC = () => {
  const [filteredAppointments, setFilteredAppointments] = useState(appointments);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredAppointments(appointments);
      setCurrentPage(1);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    
    const filtered = appointments.filter(appointment => {
      const customer = customers.find(c => c.id === appointment.customerId);
      const pet = pets.find(p => p.id === appointment.petId);
      const vet = veterinarians.find(v => v.id === appointment.vetId);
      
      return (
        customer?.name.toLowerCase().includes(lowerQuery) ||
        pet?.name.toLowerCase().includes(lowerQuery) ||
        pet?.type.toLowerCase().includes(lowerQuery) ||
        vet?.name.toLowerCase().includes(lowerQuery) ||
        appointment.type.toLowerCase().includes(lowerQuery) ||
        appointment.date.includes(query)
      );
    });
    
    setFilteredAppointments(filtered);
    setCurrentPage(1);
  };
  
  const handleNewBooking = () => {
    window.location.hash = '#new-booking';
    const event = new CustomEvent('navigate', { detail: 'new-booking' });
    window.dispatchEvent(event);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Veterinary Bookings</h1>
        <div className="bg-white border border-gray-200 rounded-lg flex">
          <button 
            className={`px-4 py-2 flex items-center gap-2 rounded-l-lg ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setViewMode('list')}
          >
            <List size={18} />
            <span>List</span>
          </button>
          <button 
            className={`px-4 py-2 flex items-center gap-2 rounded-r-lg ${viewMode === 'calendar' ? 'bg-emerald-100 text-emerald-700' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setViewMode('calendar')}
          >
            <Calendar size={18} />
            <span>Calendar</span>
          </button>
        </div>
      </div>
      
      <SearchBar onSearch={handleSearch} onNewBooking={handleNewBooking} />
      
      {viewMode === 'list' ? (
        <>
          <AppointmentTable 
            appointments={paginatedAppointments}
            customers={customers}
            pets={pets}
            veterinarians={veterinarians}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-500 text-center">Calendar view would be implemented here</p>
          <div className="grid grid-cols-7 gap-2 mt-4">
            {Array.from({ length: 31 }, (_, i) => (
              <div 
                key={i} 
                className="aspect-square border border-gray-200 rounded-md flex items-center justify-center p-2 hover:bg-gray-50 cursor-pointer"
              >
                <span className="text-sm">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VeterinaryBookings;