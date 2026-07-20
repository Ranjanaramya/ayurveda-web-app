import { Testimonial } from '../types/common';
import { getTestimonials, getAllTestimonialsRaw, saveTestimonials } from '../lib/mockSanity';
import { fetchReviews } from '../lib/sanity/fetch';
import { client } from '../lib/sanity/client';

export async function fetchApprovedReviews(): Promise<Testimonial[]> {
  try {
    const data = await fetchReviews();
    if (data && data.length > 0) {
      return data;
    }
  } catch (error) {
    console.warn('Sanity reviews fetch failed or unconfigured. Falling back to local storage.', error);
  }

  // Fallback to local storage mock store
  return getTestimonials();
}

export interface SubmitReviewInput {
  patientId: string;
  name: string;
  location: string;
  treatmentReceived: string;
  rating: number;
  text: string;
}

export async function submitPatientReview(input: SubmitReviewInput): Promise<Testimonial> {
  const newId = `rev-${Date.now()}`;
  const avatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(input.name)}`;
  
  const newReview: Testimonial = {
    id: newId,
    patientId: input.patientId,
    name: input.name,
    location: input.location || 'Patient',
    treatmentReceived: input.treatmentReceived,
    rating: input.rating,
    text: input.text,
    avatar,
    approved: false, // Pending Sanity Studio approval
    createdAt: new Date().toISOString(),
  };

  // If Sanity client is configured, submit to live Sanity dataset as a draft/unapproved document
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'mock-id') {
    try {
      await client.create({
        _type: 'review',
        patientId: input.patientId,
        name: input.name,
        location: input.location,
        treatmentReceived: input.treatmentReceived,
        rating: input.rating,
        text: input.text,
        approved: false, // Moderation flag
        avatar,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Direct Sanity document creation error:', err);
    }
  }

  // Save to local storage for local database parity
  const allReviews = getAllTestimonialsRaw();
  saveTestimonials([newReview, ...allReviews]);

  return newReview;
}
