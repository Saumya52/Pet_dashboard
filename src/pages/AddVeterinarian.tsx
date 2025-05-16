import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Button from '../components/common/Button';

interface VetFormData {
  name: string;
  email: string;
  specialization: string;
  education: string[];
  experience: number;
  about: string;
  photoId: string;
  clinicAddress: string;
  availableTime: string;
  listedOnPetCareSince: string;
  mbbs: string;
  topHospitalAssociations: string[];
}

const AddVeterinarian: React.FC = () => {
  const [formData, setFormData] = useState<VetFormData>({
    name: '',
    email: '',
    specialization: '',
    education: [''],
    experience: 0,
    about: '',
    photoId: '',
    clinicAddress: '',
    availableTime: '',
    listedOnPetCareSince: '',
    mbbs: '',
    topHospitalAssociations: [''],
  });
  const [loading, setLoading] = useState(false);

  const specializations = [
  'General Practice',
  'Surgery',
  'Dentistry',
  'Dermatology',
  'Cardiology',
  'Neurology',
  'Oncology',
  'Emergency and Critical Care',
  'Internal Medicine',
  'Radiology',
  'Anesthesiology',
  'Behavioral Medicine',
  'Avian Medicine',
  'Equine Medicine',
  'Exotics and Wildlife',
  'Zoological Medicine',
  'Food Animal Medicine',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'experience' ? parseInt(value) || 0 : value
    }));
  };

  const handleArrayChange = (index: number, value: string, field: 'education' | 'topHospitalAssociations') => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const addArrayItem = (field: 'education' | 'topHospitalAssociations') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index: number, field: 'education' | 'topHospitalAssociations') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/vet/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add veterinarian');
      }

      const data = await response.json();
      toast.success('Veterinarian added successfully!');
      setFormData({
        name: '',
        email: '',
        specialization: '',
        education: ['',''],
        experience: 0,
        about: '',
        photoId: '',
        clinicAddress: '',
        availableTime: '',
        listedOnPetCareSince: '',
        mbbs: '',
        topHospitalAssociations: [''],
      });
    } catch (error) {
      toast.error('Failed to add veterinarian');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Veterinarian</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Dr. John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="doctor@example.com"
            />
          </div>

          <div>
            <label htmlFor="photoId" className="block text-sm font-medium text-gray-700 mb-1">
              Photo ID *
            </label>
            <input
              type="text"
              id="photoId"
              name="photoId"
              required
              value={formData.photoId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Photo ID or URL"
            />
          </div>

          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
              Specialization *
            </label>
            <select
              id="specialization"
              name="specialization"
              required
              value={formData.specialization}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Select Specialization</option>
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Education *
            </label>
            {formData.education.map((edu, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={edu}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'education')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Education qualification"
                  required
                />
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'education')}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('education')}
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            >
              + Add Education
            </button>
          </div>

          <div>
            <label htmlFor="mbbs" className="block text-sm font-medium text-gray-700 mb-1">
              MBBS Details *
            </label>
            <input
              type="text"
              id="mbbs"
              name="mbbs"
              required
              value={formData.mbbs}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="MBBS details"
            />
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
              Years of Experience *
            </label>
            <input
              type="number"
              id="experience"
              name="experience"
              required
              min="0"
              max="50"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="clinicAddress" className="block text-sm font-medium text-gray-700 mb-1">
              Clinic Address *
            </label>
            <textarea
              id="clinicAddress"
              name="clinicAddress"
              required
              value={formData.clinicAddress}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Full clinic address"
            />
          </div>

          <div>
            <label htmlFor="availableTime" className="block text-sm font-medium text-gray-700 mb-1">
              Available Time *
            </label>
            <input
              type="text"
              id="availableTime"
              name="availableTime"
              required
              value={formData.availableTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="e.g., Mon-Fri 9AM-5PM"
            />
          </div>

          <div>
            <label htmlFor="listedOnPetCareSince" className="block text-sm font-medium text-gray-700 mb-1">
              Listed On PetCare Since *
            </label>
            <input
              type="date"
              id="listedOnPetCareSince"
              name="listedOnPetCareSince"
              required
              value={formData.listedOnPetCareSince}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Top Hospital Associations *
            </label>
            {formData.topHospitalAssociations.map((hospital, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={hospital}
                  onChange={(e) => handleArrayChange(index, e.target.value, 'topHospitalAssociations')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Hospital name"
                  required
                />
                {formData.topHospitalAssociations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'topHospitalAssociations')}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('topHospitalAssociations')}
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
            >
              + Add Hospital Association
            </button>
          </div>

          <div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
              About
            </label>
            <textarea
              id="about"
              name="about"
              rows={4}
              value={formData.about}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Brief description of experience and expertise..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'vets' }))}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Veterinarian'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddVeterinarian;