import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const { type, id } = await request.json();

    if (type === 'doctor') {
      revalidatePath('/doctors');
      revalidatePath('/');
    } else if (type === 'treatment') {
      revalidatePath('/treatments');
      revalidatePath('/');
    } else if (type === 'blog') {
      revalidatePath('/blogs');
      if (id) {
        revalidatePath(`/blogs/${id}`);
      }
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating cache', error: err },
      { status: 550 }
    );
  }
}
