export interface Testimonial {
  id: string;
  patientId?: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  treatmentReceived: string;
  avatar: string;
  approved?: boolean;
  createdAt?: string;
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
