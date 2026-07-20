import { fetchTreatments } from '../lib/sanity/fetch';
import { Treatment } from '../types/treatment';

export async function getTreatmentsList(): Promise<Treatment[]> {
  try {
    return await fetchTreatments();
  } catch (error) {
    console.error('Error fetching treatments:', error);
    return [];
  }
}
