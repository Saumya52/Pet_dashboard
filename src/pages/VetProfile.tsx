import React, { useState } from 'react';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import EditVet from './EditVet';
import { Veterinarian } from '../types';

interface VetProfileProps {
  vetId: number;
}

const VetProfile: React.FC<VetProfileProps> = ({ vetId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [vet, setVet] = useState<Veterinarian>({
    id: vetId.toString(),
    name: "Dr. Smith",
    email: "drsmith@example.com",
    avatar: "DS",
    specialization: ["General Practice"],
    education: ["DVM - Veterinary School", "MSc - Animal Science"],
    experience: 8,
    photoId: "vet123",
    about: "Experienced veterinarian specializing in small animal medicine with a focus on preventive care.",
    clinicAddress: "456 Vet Clinic St, Medical District, City 12345",
    availableTime: "Mon-Fri: 9:00 AM - 5:00 PM",
    createdAt: "2020-01-15",
  });

  if (isEditing) {
    return <EditVet vetId={vetId} onCancel={() => setIsEditing(false)} />;
  }

  const handleBack = () => {
    const event = new CustomEvent('navigate', { detail: 'vets' });
    window.dispatchEvent(event);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center">
            <Avatar initials={vet.avatar} size="lg" />
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-800">{vet.name}</h1>
              <p className="text-emerald-600">{vet.specialization.join(', ')}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Professional Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-800">{vet.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Experience</label>
                  <p className="text-gray-800">{vet.experience} years</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Education</label>
                  {vet.education?.map((edu, index) => (
                    <p key={index} className="text-gray-800">{edu}</p>
                  ))}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Available Time</label>
                  <p className="text-gray-800">{vet.availableTime}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Clinic Address</label>
                  <p className="text-gray-800">{vet.clinicAddress}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Member Since</label>
                  <p className="text-gray-800">{new Date(vet.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Specializations</h2>
              <div className="space-y-3">
                {vet.specialization.map((spec, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-800">{spec}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">About</h2>
                <p className="text-gray-700">{vet.about}</p>
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

export default VetProfile;
