import React from 'react';
import Avatar from '../common/Avatar';
import { Appointment, Customer, Pet, Veterinarian } from '../../types';

interface AppointmentTableProps {
  appointments: Appointment[];
  customers: Customer[];
  pets: Pet[];
  veterinarians: Veterinarian[];
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
  customers,
  pets,
  veterinarians,
}) => {
  const getCustomer = (id: number) => customers.find(c => c.id === id);
  const getPet = (id: number) => pets.find(p => p.id === id);
  const getVet = (id: number) => veterinarians.find(v => v.id === id);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-100">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Veterinary Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vet Name</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((appointment) => {
            const customer = getCustomer(appointment.customerId);
            const pet = getPet(appointment.petId);
            const vet = getVet(appointment.vetId);

            return (
              <tr key={appointment.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Avatar initials={customer?.avatar || ''} size="sm" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{customer?.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{appointment.date}</div>
                  <div className="text-sm text-gray-500">{appointment.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${appointment.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Avatar initials={pet?.avatar || ''} size="sm" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{pet?.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pet?.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{vet?.name}</div>
                  <div className="text-sm text-blue-500 hover:text-blue-700">
                    <a href={`mailto:${vet?.email}`}>{vet?.email}</a>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;