// lib/sanity.ts
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  if (!source) return null;
  
  // Oru velai image already full URL string-a irundha adhaiye return panniidum
  if (typeof source === 'string') {
    return { url: () => source };
  }

  return builder.image(source);
}

export interface Treatment {
  _id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  duration: string;
  costEstimate: string;
  image: any;
  herbsUsed?: string[];
}

export const treatmentsQuery = `*[_type == "treatment"]{
  _id,
  name,
  category,
  description,
  benefits,
  duration,
  costEstimate,
  image,
  herbsUsed
}`;