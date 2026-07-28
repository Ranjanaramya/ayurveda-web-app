import { fetchInquiries } from '../lib/sanity/fetch';
import { client } from '../lib/sanity/client';
import { PatientInquiry } from '../types/inquiry';

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

  try {
    const response = await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    });

    if (response.ok) {
      const resData = await response.json();
      if (resData?.id) {
        newInquiry.id = resData.id;
        return newInquiry;
      }
    }
  } catch (err) {
    console.warn('API inquiry endpoint error, attempting direct client write:', err);
  }

  try {
    const result = await client.create({
      _type: 'patientInquiry',
      patientName: newInquiry.patientName,
      email: newInquiry.email,
      phone: newInquiry.phone,
      preferredDate: newInquiry.preferredDate,
      preferredTime: newInquiry.preferredTime,
      doctorId: newInquiry.doctorId,
      treatmentId: newInquiry.treatmentId,
      doctorName: newInquiry.doctorName || 'Any Available Specialist',
      treatmentName: newInquiry.treatmentName || 'General Consultation',
      message: newInquiry.message,
      status: newInquiry.status,
    });
    if (result?._id) {
      newInquiry.id = result._id;
    }
  } catch (clientErr) {
    console.error('Sanity client direct write error:', clientErr);
  }

  return newInquiry;
}
