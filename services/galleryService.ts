import { client } from '@/sanity/lib/client';
import { projectId } from '@/sanity/env';
import { getGallery } from '@/lib/mockSanity';

const isMock = !projectId || projectId === 'mock-id';

export async function getGalleryItems() {
  if (isMock) {
    return getGallery();
  }
  try {
    const query = `*[_type == "gallery"] {
      "_id": _id,
      "title": title,
      "category": category,
      "description": description,
      "image": image
    }`;
    const data = await client.fetch(query);
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return getGallery();
  } catch (error) {
    console.warn('Unable to reach Sanity API for gallery items, using local fallback:', error);
    return getGallery();
  }
}