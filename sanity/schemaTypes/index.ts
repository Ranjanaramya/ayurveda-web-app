import { type SchemaTypeDefinition } from 'sanity';
import { doctor } from './doctor';
import { treatment } from './treatment';
import { blog } from './blog';
import { inquiry } from './inquiry';
import { reviewSchema } from './review';
import { contactMessage } from './contactMessage';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [doctor, treatment, blog, inquiry, reviewSchema, contactMessage],
};

