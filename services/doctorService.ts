import { fetchDoctors, fetchDoctorConsultations } from '../lib/sanity/fetch';
import { getDoctors as getMockDoctors } from '../lib/mockSanity';
import { Doctor } from '../types/doctor';

export async function getDoctorsList(): Promise<Doctor[]> {
  try {
    const data = await fetchDoctors();
    return data && data.length > 0 ? data : getMockDoctors();
  } catch (error) {
    console.warn('Error fetching doctors, using local fallback:', error);
    return getMockDoctors();
  }
}

export async function getDoctorConsultationsList() {
  try {
    return await fetchDoctorConsultations();
  } catch (error) {
    console.warn('Error fetching doctor consultations:', error);
    return [];
  }
}
