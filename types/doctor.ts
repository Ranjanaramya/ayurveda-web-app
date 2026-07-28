export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialization: string[];
  bio: string;
  image: string;
  certifications: string[];
  experience: string;
  availability: {
    days: string[];
    timeSlot: string;
  };
  contactEmail: string;
  treatmentIds?: string[];
  availableTimeSlots?: string[];
}
