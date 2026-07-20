import { groq } from 'next-sanity';

export const doctorsQuery = groq`*[_type == "doctor"] {
  "id": _id,
  name,
  role,
  specialization,
  bio,
  image,
  certifications,
  experience,
  availability,
  contactEmail
}`;

export const treatmentsQuery = groq`*[_type == "treatment"] {
  "id": _id,
  name,
  category,
  description,
  benefits,
  duration,
  costEstimate,
  image,
  herbsUsed
}`;

export const blogsQuery = groq`*[_type == "blog"] | order(publishedAt desc) {
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

export const blogByIdQuery = groq`*[_type == "blog" && _id == $id][0] {
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

export const inquiriesQuery = groq`*[_type == "patientInquiry"] | order(createdAt desc) {
  "id": _id,
  patientName,
  email,
  phone,
  preferredDate,
  preferredTime,
  doctorId,
  treatmentId,
  message,
  createdAt,
  status
}`;

export const APPROVED_REVIEWS_QUERY = groq`*[_type == "review" && approved == true] | order(createdAt desc) {
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
