import { fetchDoctors } from '../lib/sanity/fetch';
import { Doctor } from '../types/doctor';

export async function getDoctorsList(): Promise<Doctor[]> {
  try {
    return await fetchDoctors();
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
}
