import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from '../../pages/Dashboard';
import VeterinaryBookings from '../../pages/VeterinaryBookings';
import VeterinarianList from '../../pages/VeterinarianList';
import AddVeterinarian from '../../pages/AddVeterinarian';
import NewBooking from '../../pages/NewBooking';
import Clients from '../../pages/Clients';
import { Toaster } from 'react-hot-toast';
import AddClient from '../../pages/AddClient';
import ClientProfile from '../../pages/ClientProfile';
import VetProfile from '../../pages/VetProfile';
import { useAuthStore } from '../../store/authStore';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);
  const [activeLink, setActiveLink] = useState('dashboard');
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);

  useEffect(() => {
    const handleNavigation = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setActiveLink(customEvent.detail);
      }
    };

    window.addEventListener('navigate', handleNavigation);

    return () => {
      window.removeEventListener('navigate', handleNavigation);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeLink) {
      case 'dashboard':
        return <Dashboard />;
      case 'bookings':
        return <VeterinaryBookings />;
      case 'new-booking':
        return <NewBooking />;
      case 'vets':
        return <VeterinarianList onViewProfile={(id) => {
          setSelectedProfileId(id);
          setActiveLink('vet-profile');
        }} />;
      case 'vet-profile':
        return selectedProfileId ? (
          <VetProfile vetId={selectedProfileId} />
        ) : (
          <VeterinarianList onViewProfile={(id) => {
            setSelectedProfileId(id);
            setActiveLink('vet-profile');
          }} />
        );
      case 'add-vet':
        return <AddVeterinarian />;
      case 'clients':
        return <Clients onViewProfile={(id) => {
          setSelectedProfileId(id);
          setActiveLink('client-profile');
        }} />;
      case 'client-profile':
        return selectedProfileId ? (
          <ClientProfile clientId={selectedProfileId} />
        ) : (
          <Clients onViewProfile={(id) => {
            setSelectedProfileId(id);
            setActiveLink('client-profile');
          }} />
        );
      case 'add-client':
        return <AddClient />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar activeLink={activeLink} onNavigate={setActiveLink} onLogout={handleLogout} />
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
        {renderContent()}
      </main>
      <Toaster position="top-right" />
    </div>
  );
};

export default Layout;