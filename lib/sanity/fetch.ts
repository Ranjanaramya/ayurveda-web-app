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
  inquiriesQuery,
} from './queries';
import { Doctor } from '../../types/doctor';
import { Treatment } from '../../types/treatment';
import { PatientInquiry } from '../../types/inquiry';

const isMock = !projectId || projectId === 'mock-id';

export async function fetchDoctors(): Promise<Doctor[]> {
  if (isMock) {
    return getDoctors();
  }
  try {
    const data = await client.fetch(doctorsQuery);
    return data && data.length > 0 ? data : getDoctors();
  } catch (err) {
    console.warn('Sanity fetchDoctors network error, using local fallback:', err);
    return getDoctors();
  }
}

export async function fetchTreatments(): Promise<Treatment[]> {
  if (isMock) {
    return getTreatments();
  }
  try {
    const data = await client.fetch(treatmentsQuery);
    return data && data.length > 0 ? data : getTreatments();
  } catch (err) {
    console.warn('Sanity fetchTreatments network error, using local fallback:', err);
    return getTreatments();
  }
}

export async function fetchBlogs() {
  if (isMock) {
    return getBlogs();
  }
  try {
    const query = `*[_type == "blog"] | order(publishedAt desc) {
      "id": _id,
      title,
      excerpt,
      content,
      author,
      publishedAt,
      category,
      readTime,
      "image": coalesce(image.asset->url, image),
      tags
    }`;
    const data = await client.fetch(query);
    return data && data.length > 0 ? data : getBlogs();
  } catch (err) {
    console.warn('Sanity fetchBlogs network error, using local fallback:', err);
    return getBlogs();
  }
}

export async function fetchBlogById(id: string) {
  if (isMock) {
    return getBlogs().find((b) => b.id === id) || null;
  }
  try {
    const query = `*[_type == "blog" && _id == $id][0] {
      "id": _id,
      title,
      excerpt,
      content,
      author,
      publishedAt,
      category,
      readTime,
      "image": coalesce(image.asset->url, image),
      tags
    }`;
    const data = await client.fetch(query, { id });
    return data || getBlogs().find((b) => b.id === id) || null;
  } catch (err) {
    console.warn('Sanity fetchBlogById network error, using local fallback:', err);
    return getBlogs().find((b) => b.id === id) || null;
  }
}

export async function fetchInquiries(): Promise<PatientInquiry[]> {
  if (isMock) {
    return getInquiries();
  }
  try {
    const data = await client.fetch(inquiriesQuery);
    return data || getInquiries();
  } catch (err) {
    console.warn('Sanity fetchInquiries network error, using local fallback:', err);
    return getInquiries();
  }
}

export async function fetchReviews() {
  if (isMock) {
    return getTestimonials();
  }
  try {
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
    const data = await client.fetch(query);
    return data && data.length > 0 ? data : getTestimonials();
  } catch (err) {
    console.warn('Sanity fetchReviews network error, using local fallback:', err);
    return getTestimonials();
  }
}

export async function fetchDoctorConsultations() {
  return [];
}