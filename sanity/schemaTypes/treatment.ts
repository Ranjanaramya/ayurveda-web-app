import { defineField, defineType } from 'sanity';

export const treatment = defineType({
  name: 'treatment',
  title: 'Ayurvedic Treatment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Treatment Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Therapy Category',
      type: 'string',
      options: {
        list: ['Panchakarma', 'Rejuvenation', 'Detox', 'Therapeutic'],
      },
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text',
    }),
    defineField({
      name: 'benefits',
      title: 'Therapeutic Benefits',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'duration',
      title: 'Duration Package',
      type: 'string',
    }),
    defineField({
      name: 'costEstimate',
      title: 'Estimated Cost',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Hero Image URL',
      type: 'url',
    }),
    defineField({
      name: 'herbsUsed',
      title: 'Key Medical Herbs',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
