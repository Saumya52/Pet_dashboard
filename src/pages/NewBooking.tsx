import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Button from '../components/common/Button';
import { veterinarians } from '../data/mockData';

interface BookingFormData {
  customerName: string;
  bookingDate: string;
  bookingTime: string;
  veterinaryType: string;
  petName: string;
  petType: string;
  vetId: string;
}

const NewBooking: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: '',
    bookingDate: '',
    bookingTime: '',
    veterinaryType: '',
    petName: '',
    petType: '',
    vetId: '',
  });

  const [loading, setLoading] = useState(false);

  const vetTypes = [
    'General Checkup',
    'Vaccination',
    'Surgery',
    'Dental Care',
    'Emergency Care',
    'Grooming',
    'Laboratory Tests',
    'X-Ray/Imaging',
  ];

  const petTypes = [
    'Dog',
    'Cat',
    'Bird',
    'Hamster',
    'Rabbit',
    'Fish',
    'Reptile',
    'Other',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      toast.success('Booking created successfully!');
      setFormData({
        customerName: '',
        bookingDate: '',
        bookingTime: '',
        veterinaryType: '',
        petName: '',
        petType: '',
        vetId: '',
      });
    } catch (error) {
      toast.error('Failed to create booking');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  const generateTimeSlots = (start: string, end: string, interval: number): string[] => {
  const slots: string[] = [];
  const [startHour, startMin] = start.split(':').map(Number);
  const [endHour, endMin] = end.split(':').map(Number);

  let current = new Date();
  current.setHours(startHour, startMin, 0, 0);

  const endTime = new Date();
  endTime.setHours(endHour, endMin, 0, 0);

  while (current <= endTime) {
    const timeStr = current.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    slots.push(timeStr);
    current.setMinutes(current.getMinutes() + interval);
  }

  return slots;
};


  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">New Booking</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
      >
        <div className="space-y-6">
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Customer Name *
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              required
              value={formData.customerName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Enter customer name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="bookingDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Booking Date *
              </label>
              <input
                type="date"
                id="bookingDate"
                name="bookingDate"
                required
                value={formData.bookingDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="bookingTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Booking Time *
              </label>
              <select
                  id="bookingTime"
                  name="bookingTime"
                  required
                  value={formData.bookingTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Select Time</option>
                  {generateTimeSlots('09:00', '19:00', 15).map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

            </div>
          </div>

          <div>
            <label
              htmlFor="veterinaryType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Veterinary Type *
            </label>
            <select
              id="veterinaryType"
              name="veterinaryType"
              required
              value={formData.veterinaryType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Select Type</option>
              {vetTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="petName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Pet Name *
              </label>
              <input
                type="text"
                id="petName"
                name="petName"
                required
                value={formData.petName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter pet name"
              />
            </div>

            <div>
              <label
                htmlFor="petType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Pet Type *
              </label>
              <select
                id="petType"
                name="petType"
                required
                value={formData.petType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Select Pet Type</option>
                {petTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="vetId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Veterinarian *
            </label>
            <select
              id="vetId"
              name="vetId"
              required
              value={formData.vetId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Select Veterinarian</option>
              {veterinarians.map((vet) => (
                <option key={vet.id} value={vet.id}>
                  {vet.name} - {vet.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }))}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Creating Booking...' : 'Create Booking'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewBooking;