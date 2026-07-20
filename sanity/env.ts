export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-20';

export const dataset = getEnv(
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  'NEXT_PUBLIC_SANITY_DATASET'
);

export const projectId = getEnv(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mock-id',
  'NEXT_PUBLIC_SANITY_PROJECT_ID'
);

function getEnv(v: string | undefined, name: string): string {
  if (!v || v === 'mock-id') {
    if (typeof window === 'undefined') {
      console.warn(`Warning: Environment variable ${name} is missing. Falling back to mock data.`);
    }
    return 'mock-id';
  }
  return v;
}
