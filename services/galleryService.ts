import { client } from '@/sanity/lib/client'; // Sanity client path-ஐ சரிபார்க்கவும்

export async function getGalleryItems() {
  try {
    const query = `*[_type == "gallery"] {
      "_id": _id,
      "title": title,
      "category": category,
      "description": description,
      "image": image
    }`;
    const data = await client.fetch(query);
    return data || [];
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return [];
  }
}