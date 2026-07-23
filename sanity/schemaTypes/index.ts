import { type SchemaTypeDefinition } from 'sanity';
import { doctor } from './doctor';
import treatment  from './treatment';
import { blog } from './blog';
import { inquiry } from './inquiry';
import gallery from './gallery';
import { reviewSchema } from './review';
import { Users } from 'lucide-react';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [doctor, treatment, blog, inquiry, gallery, reviewSchema],
};
