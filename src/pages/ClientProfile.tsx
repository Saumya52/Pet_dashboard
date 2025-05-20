import React, { useState } from 'react';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import EditClient from './EditClient';
import { Customer } from '../types';

interface ClientProfileProps {
  clientId: string;
}

const ClientProfile: React.FC<ClientProfileProps> = ({ clientId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [client, setClient] = useState<Customer>({
    id: clientId,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 000-0000",
    avatar: "JD",
    pets: [
      { id: "1", name: "Max", type: "Dog", breed: "Golden Retriever", age: "3", avatar: "MX", ownerId: clientId },
      { id: "2", name: "Luna", type: "Cat", breed: "Persian", age: "2", avatar: "LN", ownerId: clientId }
    ]
  });

  if (isEditing) {
    return <EditClient clientId={Number(clientId)} onCancel={() => setIsEditing(false)} />;
  }

  const handleBack = () => {
    const event = new CustomEvent('navigate', { detail: 'clients' });
    window.dispatchEvent(event);
  };

  const handleViewPet = (petId: string) => {
    const event = new CustomEvent('navigate', { detail: 'pet-profile', petId });
    window.dispatchEvent(event);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center">
            <Avatar initials={client.avatar} size="lg" />
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-800">{client.name}</h1>
              <p className="text-emerald-600">Client ID: {client.id}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-800">{client.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-800">{client.phone}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Pets</h2>
              <div className="space-y-4">
                {client.pets?.map((pet) => (
                  <div key={pet.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar initials={pet.avatar} size="sm" />
                        <div className="ml-3">
                          <h3 className="font-medium text-gray-800">{pet.name}</h3>
                          <p className="text-sm text-gray-600">{pet.type} - {pet.breed}</p>
                          <p className="text-sm text-gray-500">Age: {pet.age} years</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewPet(pet.id)}
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Appointments</h2>
            <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
              No recent appointments
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
