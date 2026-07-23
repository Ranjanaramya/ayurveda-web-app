import { defineField, defineType } from 'sanity';

export const doctor = defineType({
  name: 'doctor',
  title: 'Doctor Profiles',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Clinic Role',
      type: 'string',
    }),
    defineField({
      name: 'specialization',
      title: 'Specializations',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'certifications',
      title: 'Board Certifications',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'experience',
      title: 'Years of Experience',
      type: 'string',
    }),
    defineField({
      name: 'availability',
      title: 'Clinic Hours',
      type: 'object',
      fields: [
        defineField({
          name: 'days',
          title: 'Active Days',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'timeSlot',
          title: 'Time Slot',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
  ],
});
