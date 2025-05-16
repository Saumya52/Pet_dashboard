export interface Customer {
  id: number;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
  pets?: Pet[];
  appointments?: Appointment[];
}

export interface Pet {
  id: number;
  name: string;
  type: string;
  avatar: string;
  ownerId: number;
  breed: string;
  age: string;
}

export interface Veterinarian {
  id: number;
  name: string;
  email: string;
  avatar: string;
  specialization: string;
  education?: string[];
  experience?: number;
  petReview?: number;
  photoId?: string;
  about?: string;
  clinicAddress?: string;
  availableTime?: string;
  listedOnPetCareSince?: string;
  mbbs?: string;
  topHospitalAssociations?: string[];
  appointments?: Appointment[];
  clients?: Customer[];
  pets?: Pet[];
  specializationCount?: number;
}

export interface Appointment {
  id: number;
  customerId: number;
  petId: number;
  vetId: number;
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