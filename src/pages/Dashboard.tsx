import React, { useState, useEffect } from 'react';
import StatCard from '../components/dashboard/StatCard';
import SearchBar from '../components/dashboard/SearchBar';
import AppointmentTable from '../components/dashboard/AppointmentTable';
import Pagination from '../components/common/Pagination';
import { 
  appointments, 
  customers, 
  getAppointmentsForToday, 
  pets,
  veterinarians 
} from '../data/mockData';
import { VetDashboardStats } from '../types';

const ITEMS_PER_PAGE = 5;

const Dashboard: React.FC = () => {
  const [filteredAppointments, setFilteredAppointments] = useState(getAppointmentsForToday());
  const [currentPage, setCurrentPage] = useState(1);
  const [dashboardStats, setDashboardStats] = useState<VetDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('http://localhost:3000/v1/doctors/dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard statistics');
      }
      const data = await response.json();
      setDashboardStats(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredAppointments(getAppointmentsForToday());
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
        appointment.type.toLowerCase().includes(lowerQuery)
      );
    });
    
    setFilteredAppointments(filtered);
    setCurrentPage(1);
  };
  
  const handleNewBooking = () => {
    alert('New booking form would open here');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-green"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  const statsCards = [
    { 
      title: 'Total Veterinarians', 
      value: dashboardStats?.totalVets || 0, 
      color: 'text-emerald-600' 
    },
    { 
      title: 'Highly Rated Vets', 
      value: dashboardStats?.highRatedVets || 0, 
      color: 'text-amber-600' 
    },
    { 
      title: 'Specializations', 
      value: dashboardStats?.specializationCount || 0, 
      color: 'text-blue-600' 
    },
    { 
      title: 'Experienced Vets', 
      value: dashboardStats?.experiencedVets || 0, 
      color: 'text-purple-600' 
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Veterinary Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <StatCard key={index} card={card} />
        ))}
      </div>

      {dashboardStats && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Specialization Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(dashboardStats.specializationStats).map(([spec, count]) => (
              <div key={spec} className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">{spec}</p>
                <p className="text-lg font-semibold text-emerald-600">{count} vets</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <SearchBar onSearch={handleSearch} onNewBooking={handleNewBooking} />
      
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
    </div>
  );
};

export default Dashboard;