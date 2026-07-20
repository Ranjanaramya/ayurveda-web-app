import { defineType, defineField } from 'sanity';

export const reviewSchema = defineType({
  name: 'review',
  title: 'Patient Reviews & Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'patientId',
      title: 'Patient ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Official patient registration code (e.g. PAT-2026-8912)',
    }),
    defineField({
      name: 'name',
      title: 'Patient Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location / City',
      type: 'string',
    }),
    defineField({
      name: 'treatmentReceived',
      title: 'Treatment Received',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1 to 5 Stars)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'text',
      title: 'Review / Feedback Content',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'approved',
      title: 'Approved for Website Display',
      type: 'boolean',
      initialValue: false,
      description: 'Check this box in Sanity Studio to publish this review onto the live website.',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar Image URL',
      type: 'url',
    }),
    defineField({
      name: 'createdAt',
      title: 'Submission Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'patientId',
      approved: 'approved',
    },
    prepare({ title, subtitle, approved }) {
      return {
        title: `${title} (${subtitle || 'No ID'})`,
        subtitle: approved ? '✅ Approved (Live on Website)' : '⏳ Pending Sanity Approval',
      };
    },
  },
});
