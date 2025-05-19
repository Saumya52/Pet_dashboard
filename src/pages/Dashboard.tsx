import React, { useState } from 'react';
import StatCard from '../components/dashboard/StatCard';
import SearchBar from '../components/dashboard/SearchBar';
import AppointmentTable from '../components/dashboard/AppointmentTable';
import Pagination from '../components/common/Pagination';
import {
  appointments,
  customers,
  getAppointmentsForToday,
  pets,
  veterinarians,
  mockDashboardStats  
} from '../data/mockData';
import { VetDashboardStats } from '../types';

const ITEMS_PER_PAGE = 5;

const Dashboard: React.FC = () => {
  const [filteredAppointments, setFilteredAppointments] = useState(getAppointmentsForToday());
  const [currentPage, setCurrentPage] = useState(1);
  const [dashboardStats] = useState<VetDashboardStats>(mockDashboardStats); // ✅ Use mock data directly

  const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredAppointments(getAppointmentsForToday());
      setCurrentPage(1);
      return;
    }

    const lowerQuery = query.toLowerCase();

    const filtered = appointments.filter((appointment) => {
      const customer = customers.find((c) => c.id === appointment.customerId);
      const pet = pets.find((p) => p.id === appointment.petId);
      const vet = veterinarians.find((v) => v.id === appointment.vetId);

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
    window.location.hash = '#new-booking';
    const event = new CustomEvent('navigate', { detail: 'new-booking' });
    window.dispatchEvent(event);
  };

  const statsCards = [
    {
      title: 'Total Veterinarians',
      value: dashboardStats.totalVets,
      color: 'text-emerald-600',
    },
    {
      title: 'Highly Rated Vets',
      value: dashboardStats.highRatedVets,
      color: 'text-amber-600',
    },
    {
      title: 'Specializations',
      value: dashboardStats.specializationCount,
      color: 'text-blue-600',
    },
    {
      title: 'Experienced Vets',
      value: dashboardStats.experiencedVets,
      color: 'text-purple-600',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Veterinary Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <StatCard key={index} card={card} />
        ))}
      </div>

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
