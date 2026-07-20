import { fetchBlogs, fetchBlogById } from '../lib/sanity/fetch';
import { Blog } from '../types/blog';

export async function getBlogsList(): Promise<Blog[]> {
  try {
    return await fetchBlogs();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function getBlogById(id: string): Promise<Blog | null> {
  try {
    return await fetchBlogById(id);
  } catch (error) {
    console.error(`Error fetching blog ${id}:`, error);
    return null;
  }
}
