import createImageUrlBuilder from '@sanity/image-url';
import { projectId, dataset } from '../../sanity/env';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || 'mock-id',
  dataset: dataset || 'production',
});

export const urlFor = (source: any) => {
  if (!source) return '';
  if (typeof source === 'string') return source;
  try {
    return imageBuilder.image(source).url() || '';
  } catch (e) {
    return '';
  }
};
