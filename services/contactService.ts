import { client } from '../lib/sanity/client';
import { projectId } from '../sanity/env';
import { ContactMessage } from '../types/contact';

const isMock = !projectId || projectId === 'mock-id';

export async function createContactMessage(
  data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>
): Promise<ContactMessage> {
  const newMessage: ContactMessage = {
    ...data,
    id: `contact-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'Pending',
  };

  if (isMock) {
    if (typeof window !== 'undefined') {
      const existingStr = localStorage.getItem('ayur_contacts');
      const existing: ContactMessage[] = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('ayur_contacts', JSON.stringify([newMessage, ...existing]));
    }
    return newMessage;
  }

  try {
    const sanityDoc = {
      _type: 'contactMessage',
      name: newMessage.name,
      email: newMessage.email,
      phone: newMessage.phone,
      message: newMessage.message,
      createdAt: newMessage.createdAt,
      status: newMessage.status,
    };
    const result = await client.create(sanityDoc);
    return {
      ...newMessage,
      id: result._id,
    };
  } catch (error) {
    console.warn(
      'Failed to write contact message to Sanity directly. Saving to localStorage.',
      error
    );
    if (typeof window !== 'undefined') {
      const existingStr = localStorage.getItem('ayur_contacts');
      const existing: ContactMessage[] = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('ayur_contacts', JSON.stringify([newMessage, ...existing]));
    }
    return newMessage;
  }
}
