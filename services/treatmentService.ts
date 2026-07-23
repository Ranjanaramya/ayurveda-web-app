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

// Gallery Component-kkaga getTreatments export-um identical-a irukka alias panni irukkom
export const getTreatments = getTreatmentsList;