import { fetchTreatments } from '../lib/sanity/fetch';
import { getTreatments as getMockTreatments } from '../lib/mockSanity';
import { Treatment } from '../types/treatment';

export async function getTreatmentsList(): Promise<Treatment[]> {
  try {
    const data = await fetchTreatments();
    return data && data.length > 0 ? data : getMockTreatments();
  } catch (error) {
    console.warn('Error fetching treatments, using local fallback:', error);
    return getMockTreatments();
  }
}

export const getTreatments = getTreatmentsList;