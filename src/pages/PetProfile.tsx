import React, { useState } from 'react';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import { Pet } from '../types';

interface PetProfileProps {
  petId: string;
}

const PetProfile: React.FC<PetProfileProps> = ({ petId }) => {
  const [pet, setPet] = useState<Pet>({
    id: petId,
    name: "Max",
    type: "Dog",
    breed: "Golden Retriever",
    age: "3",
    avatar: "MX",
    ownerId: "1",
    medicalHistory: [
      {
        date: "2023-01-15",
        description: "Annual checkup",
        treatment: "Vaccinations updated"
      },
      {
        date: "2023-06-20",
        description: "Dental cleaning",
        treatment: "Professional cleaning and examination"
      }
    ]
  });

  const handleBack = () => {
    const event = new CustomEvent('navigate', { detail: { page: 'client-profile', clientId: pet.ownerId } });
    window.dispatchEvent(event);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center">
            <Avatar initials={pet.avatar} size="lg" />
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-800">{pet.name}</h1>
              <p className="text-emerald-600">{pet.type} - {pet.breed}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Pet Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Age</label>
                  <p className="text-gray-800">{pet.age} years</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Breed</label>
                  <p className="text-gray-800">{pet.breed}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Type</label>
                  <p className="text-gray-800">{pet.type}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Medical History</h2>
              <div className="space-y-4">
                {pet.medicalHistory?.map((record, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">{record.description}</p>
                        <p className="text-sm text-gray-600">{record.treatment}</p>
                      </div>
                      <p className="text-sm text-gray-500">{record.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
            <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
              No upcoming appointments
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={handleBack}>
              Back to Owner Profile
            </Button>
            <Button variant="primary" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'new-booking' }))}>
              Schedule Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetProfile;
