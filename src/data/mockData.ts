import { Appointment, Customer, Pet, StatCard, Veterinarian } from '../types';

export const customers: Customer[] = [
  { id: 1, name: 'John Doe', avatar: 'JD' },
  { id: 2, name: 'Jane Smith', avatar: 'JS' },
  { id: 3, name: 'Michael Brown', avatar: 'MB' },
  { id: 4, name: 'Emily Davis', avatar: 'ED' },
  { id: 5, name: 'Sarah Wilson', avatar: 'SW' },
  { id: 6, name: 'David Miller', avatar: 'DM' },
  { id: 7, name: 'Lisa Johnson', avatar: 'LJ' },
  { id: 8, name: 'Robert Garcia', avatar: 'RG' },
];

export const pets: Pet[] = [
  { id: 1, name: 'Max', type: 'Dog', avatar: 'MX', ownerId: 1 },
  { id: 2, name: 'Bella', type: 'Cat', avatar: 'BL', ownerId: 2 },
  { id: 3, name: 'Charlie', type: 'Dog', avatar: 'CH', ownerId: 3 },
  { id: 4, name: 'Daisy', type: 'Dog', avatar: 'DS', ownerId: 4 },
  { id: 5, name: 'Luna', type: 'Cat', avatar: 'LN', ownerId: 5 },
  { id: 6, name: 'Rocky', type: 'Dog', avatar: 'RK', ownerId: 6 },
  { id: 7, name: 'Milo', type: 'Cat', avatar: 'ML', ownerId: 7 },
  { id: 8, name: 'Bailey', type: 'Dog', avatar: 'BY', ownerId: 8 },
];

export const veterinarians: Veterinarian[] = [
  { id: 1, name: 'Dr. Smith', email: 'drsmith@example.com', avatar: 'DS', specialization: 'General Practice' },
  { id: 2, name: 'Dr. Lee', email: 'drlee@example.com', avatar: 'DL', specialization: 'Surgery' },
  { id: 3, name: 'Dr. Johnson', email: 'drjohnson@example.com', avatar: 'DJ', specialization: 'Dentistry' },
  { id: 4, name: 'Dr. Taylor', email: 'drtaylor@example.com', avatar: 'DT', specialization: 'Dermatology' },
  { id: 5, name: 'Dr. Green', email: 'drgreen@example.com', avatar: 'DG', specialization: 'Cardiology' },
];

export const appointments: Appointment[] = [
  { id: 1, customerId: 1, petId: 1, vetId: 1, date: '2023-10-01', time: '10:00 AM', type: 'General Checkup', price: 50 },
  { id: 2, customerId: 2, petId: 2, vetId: 2, date: '2023-10-01', time: '11:00 AM', type: 'Vaccination', price: 30 },
  { id: 3, customerId: 3, petId: 3, vetId: 3, date: '2023-10-01', time: '12:00 PM', type: 'Dental Checkup', price: 75 },
  { id: 4, customerId: 4, petId: 4, vetId: 4, date: '2023-10-01', time: '01:00 PM', type: 'Grooming', price: 40 },
  { id: 5, customerId: 5, petId: 5, vetId: 5, date: '2023-10-01', time: '02:00 PM', type: 'General Checkup', price: 50 },
  { id: 6, customerId: 6, petId: 6, vetId: 1, date: '2023-10-02', time: '09:00 AM', type: 'Vaccination', price: 30 },
  { id: 7, customerId: 7, petId: 7, vetId: 2, date: '2023-10-02', time: '10:30 AM', type: 'General Checkup', price: 50 },
  { id: 8, customerId: 8, petId: 8, vetId: 3, date: '2023-10-02', time: '11:45 AM', type: 'Dental Checkup', price: 75 },
];

export const statsCards: StatCard[] = [
  { title: 'Total Clients', value: 150, color: 'text-gray-500' },
  { title: 'Appointments Today', value: 25, color: 'text-gray-500' },
  { title: 'Most Booked Pet Type', value: 'Dogs', color: 'text-gray-500' },
];

export const getCustomerById = (id: number): Customer | undefined => {
  return customers.find(customer => customer.id === id);
};

export const getPetById = (id: number): Pet | undefined => {
  return pets.find(pet => pet.id === id);
};

export const getVetById = (id: number): Veterinarian | undefined => {
  return veterinarians.find(vet => vet.id === id);
};

export const getAppointmentsForToday = (): Appointment[] => {
  return appointments.filter(appointment => appointment.date === '2023-10-01');
};