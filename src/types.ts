export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialization: string[];
  bio: string;
  image: string;
  certifications: string[];
  experience: string; // e.g., "15+ Years"
  availability: {
    days: string[]; // e.g., ["Monday", "Wednesday", "Friday"]
    timeSlot: string; // e.g., "09:00 AM - 01:00 PM"
  };
  contactEmail: string;
}

export interface Treatment {
  id: string;
  name: string;
  category: string; // e.g., "Panchakarma", "Rejuvenation", "Detox", "Therapeutic"
  description: string;
  benefits: string[];
  duration: string; // e.g., "60 Mins", "14 Days Package"
  costEstimate: string; // e.g., "$45", "$350"
  image: string;
  herbsUsed: string[]; // e.g., ["Ashwagandha", "Brahmi"]
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string; // e.g., "2026-07-15"
  category: string; // e.g., "Nutrition", "Yoga", "Herbal Medicine", "Lifestyle"
  readTime: string; // e.g., "5 Min Read"
  image: string;
  tags: string[];
}

export interface PatientInquiry {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  doctorId: string; // References Doctor.id
  treatmentId: string; // References Treatment.id
  message: string;
  createdAt: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  treatmentReceived: string;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Hospital' | 'Treatments' | 'Herbal Garden' | 'Yoga & Meditation';
  image: string;
  description: string;
}
