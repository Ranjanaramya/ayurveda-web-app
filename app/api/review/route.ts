import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from 'next-sanity';

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, name, location, treatmentReceived, rating, text } = body;

    if (!patientId || !name || !text) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Sanity Dataset-இல் Review சேமித்தல்
    await writeClient.create({
      _type: 'review',
      patientId,
      name,
      location: location || 'Patient',
      treatmentReceived,
      rating: Number(rating) || 5,
      text,
      approved: false,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      createdAt: new Date().toISOString(),
    });

    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Error creating review:', err);
    return NextResponse.json(
      { error: err?.message || 'Server error' },
      { status: 500 }
    );
  }
}