import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN;

const writeClient = projectId && projectId !== 'mock-id'
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false,
    })
  : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      patientName,
      email,
      phone,
      preferredDate,
      preferredTime,
      doctorId,
      treatmentId,
      doctorName,
      treatmentName,
      message,
    } = body;

    if (!patientName || !email || !phone) {
      return NextResponse.json({ error: 'Patient name, email, and phone are required.' }, { status: 400 });
    }

    const docPayload = {
      _type: 'patientInquiry',
      patientName: String(patientName).trim(),
      email: String(email).trim(),
      phone: String(phone).trim(),
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: preferredTime || '08:00 AM - 09:00 AM',
      doctorId: doctorId || 'any',
      treatmentId: treatmentId || 'any',
      doctorName: doctorName || 'Any Available Specialist',
      treatmentName: treatmentName || 'General Consultation',
      message: message ? String(message).trim() : '',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    if (writeClient) {
      const result = await writeClient.create(docPayload);
      return NextResponse.json({ success: true, id: result._id, data: docPayload });
    }

    // Fallback response for mock mode
    return NextResponse.json({ success: true, id: `inq-mock-${Date.now()}`, data: docPayload });
  } catch (err: any) {
    console.error('Error creating patient inquiry in Sanity:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to record patient inquiry' },
      { status: 500 }
    );
  }
}
