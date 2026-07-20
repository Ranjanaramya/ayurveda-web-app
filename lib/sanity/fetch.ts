import { client } from './client';
import { projectId } from '../../sanity/env';
import {
  getDoctors,
  getTreatments,
  getBlogs,
  getInquiries,
  getTestimonials,
} from '../mockSanity';
import {
  doctorsQuery,
  treatmentsQuery,
  blogsQuery,
  blogByIdQuery,
  inquiriesQuery,
  APPROVED_REVIEWS_QUERY,
} from './queries';
import { Doctor } from '../../types/doctor';
import { Treatment } from '../../types/treatment';
import { Blog } from '../../types/blog';
import { PatientInquiry } from '../../types/inquiry';
import { Testimonial } from '../../types/common';

const isMock = !projectId || projectId === 'mock-id';

export async function fetchDoctors(): Promise<Doctor[]> {
  if (isMock) {
    return getDoctors();
  }
  return client.fetch(doctorsQuery);
}

export async function fetchTreatments(): Promise<Treatment[]> {
  if (isMock) {
    return getTreatments();
  }
  return client.fetch(treatmentsQuery);
}

export async function fetchBlogs(): Promise<Blog[]> {
  if (isMock) {
    return getBlogs();
  }
  return client.fetch(blogsQuery);
}

export async function fetchBlogById(id: string): Promise<Blog | null> {
  if (isMock) {
    const blogs = getBlogs();
    return blogs.find((b) => b.id === id) || null;
  }
  return client.fetch(blogByIdQuery, { id });
}

export async function fetchInquiries(): Promise<PatientInquiry[]> {
  if (isMock) {
    return getInquiries();
  }
  return client.fetch(inquiriesQuery);
}

export async function fetchReviews(): Promise<Testimonial[]> {
  if (isMock) {
    return getTestimonials();
  }
  return client.fetch(APPROVED_REVIEWS_QUERY);
}
