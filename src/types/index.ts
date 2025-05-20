export interface Customer {
  id: string; // Changed from number to string for MongoDB _id
  name: string; // Mapped from user_name
  avatar: string; // Mapped from profile_pic
  email: string;
  phone: string;
  pets?: Pet[];
  appointments?: Appointment[];
}

export interface Pet {
  id: string; // Changed from number to string for MongoDB _id
  name: string; // Mapped from pet_name
  type: string;
  avatar: string; // Mapped from pet_image
  ownerId: string; // Changed from number to string for MongoDB _id
  breed: string;
  age: string;
  owner?: Customer; // Added for relationship
  appointments?: Appointment[];
  medicalHistory?: {
    date: string;
    description: string;
    treatment: string;
  }[];
}

export interface Veterinarian {
  id: string; // Changed to string since it comes from MongoDB _id
  name: string;
  email: string;
  avatar: string; // This will be mapped from profile_pic
  specialization: string[];
  education: string[];
  experience: number;
  photoId: string; // Mapped from firebase_uid
  about: string;
  clinicAddress: string; // Mapped from address
  availableTime: string; // Computed from availability array
  createdAt: string; // Replaces listedOnPetCareSince
  appointments?: Appointment[];
  clients?: Customer[];
  pets?: Pet[];
  specializationCount?: number;
}

export interface Appointment {
  id: string; // Changed from number to string for MongoDB _id
  customerId: string; // Changed from number to string for MongoDB _id
  petId: string; // Changed from number to string for MongoDB _id
  vetId: string; // Changed from number to string for MongoDB _id
  date: string;
  time: string;
  type: string;
  price: number;
}

export interface StatCard {
  title: string;
  value: string | number;
  color: string;
}

export interface VetDashboardStats {
  totalVets: number;
  highRatedVets: number;
  lowRatedVets: number;
  newVets: number;
  experiencedVets: number;
  specializationCount: number;
  specializationStats: Record<string, number>;
  vets: Veterinarian[];
}