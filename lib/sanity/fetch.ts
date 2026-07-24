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

export async function fetchBlogs() {
  const query = `*[_type == "blog"] | order(publishedAt desc) {
    "id": _id,
    title,
    excerpt,
    content,
    author,
    publishedAt,
    category,
    readTime,
    image,
    tags
  }`;

  return await client.fetch(query);
}

export async function fetchBlogById(id: string) {
  const query = `*[_type == "blog" && _id == $id][0] {
    "id": _id,
    title,
    excerpt,
    content,
    author,
    publishedAt,
    category,
    readTime,
    image,
    tags
  }`;

  return await client.fetch(query, { id });
}
export async function fetchInquiries(): Promise<PatientInquiry[]> {
  if (isMock) {
    return getInquiries();
  }
  return client.fetch(inquiriesQuery);
}

export async function fetchReviews() {
  // approved == true உள்ள தரவுகள் மட்டுமே ஃபில்டர் ஆகும்
  const query = `*[_type == "review" && approved == true] | order(_createdAt desc){
    "id": _id,
    patientId,
    name,
    location,
    treatmentReceived,
    rating,
    text,
    avatar,
    approved,
    createdAt
  }`;

  return await client.fetch(query);
}