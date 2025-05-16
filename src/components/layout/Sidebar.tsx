import React from 'react';
import { LayoutDashboard, Calendar, Users, UserRound, UserPlus } from 'lucide-react';

interface SidebarProps {
  activeLink: string;
  onNavigate: (link: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeLink, onNavigate }) => {
  const links = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: 'bookings',
      label: 'Veterinary Bookings',
      icon: <Calendar size={20} />,
    },
    { id: 'vets', label: 'Veterinarian List', icon: <UserRound size={20} /> },
    { id: 'add-vet', label: 'Add Veterinarian', icon: <UserPlus size={20} /> },
    { id: 'clients', label: 'Clients', icon: <Users size={20} /> },
  ];

  return (
    <div className="bg-white h-full w-64 flex flex-col shadow-sm border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-lime-green">Vet Dashboard</h1>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => onNavigate(link.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition-colors duration-200 ${
                  activeLink === link.id
                    ? 'bg-lime-green text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span
                  className={
                    activeLink === link.id
                      ? 'text-emerald-700'
                      : 'text-gray-500'
                  }
                >
                  {link.icon}
                </span>
                <span className="font-medium">{link.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;