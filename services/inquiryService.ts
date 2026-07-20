import { fetchInquiries } from '../lib/sanity/fetch';
import { saveInquiries, getInquiries } from '../lib/mockSanity';
import { client } from '../lib/sanity/client';
import { projectId } from '../sanity/env';
import { PatientInquiry } from '../types/inquiry';

const isMock = !projectId || projectId === 'mock-id';

export async function getInquiriesList(): Promise<PatientInquiry[]> {
  try {
    return await fetchInquiries();
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return [];
  }
}

export async function createPatientInquiry(
  inquiry: Omit<PatientInquiry, 'id' | 'createdAt' | 'status'>
): Promise<PatientInquiry> {
  const newInquiry: PatientInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'Pending',
  };

  if (isMock) {
    const inquiries = getInquiries();
    saveInquiries([newInquiry, ...inquiries]);
    return newInquiry;
  }

  try {
    const sanityDoc = {
      _type: 'patientInquiry',
      patientName: newInquiry.patientName,
      email: newInquiry.email,
      phone: newInquiry.phone,
      preferredDate: newInquiry.preferredDate,
      preferredTime: newInquiry.preferredTime,
      doctorId: newInquiry.doctorId,
      treatmentId: newInquiry.treatmentId,
      message: newInquiry.message,
      status: newInquiry.status,
    };

    // Note: Creating via client usually needs a write token. If it fails, fallback to local storage
    const result = await client.create(sanityDoc);
    return {
      ...newInquiry,
      id: result._id,
    };
  } catch (error) {
    console.warn(
      'Failed to write to Sanity directly (normal if write tokens are unset). Saving to localStorage instead.',
      error
    );
    const inquiries = getInquiries();
    saveInquiries([newInquiry, ...inquiries]);
    return newInquiry;
  }
}
