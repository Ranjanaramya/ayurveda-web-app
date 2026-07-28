import { defineField, defineType } from 'sanity';
import { DoctorImageInput } from '../components/DoctorImageInput';

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
        storeOriginalFilename: true,
        metadata: ['blurhash', 'lqip', 'palette', 'exif', 'location'],
        accept: 'image/*',
      },
      components: {
        input: DoctorImageInput,
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

    // 🟢 UPDATED: Availability Object structured for dynamic selection
    defineField({
      name: 'availability',
      title: 'Clinic Availability',
      type: 'object',
      fields: [
        defineField({
          name: 'days',
          title: 'Active Days',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Monday', value: 'Monday' },
              { title: 'Tuesday', value: 'Tuesday' },
              { title: 'Wednesday', value: 'Wednesday' },
              { title: 'Thursday', value: 'Thursday' },
              { title: 'Friday', value: 'Friday' },
              { title: 'Saturday', value: 'Saturday' },
              { title: 'Sunday', value: 'Sunday' },
            ],
          },
        }),
        defineField({
          name: 'timeSlots',
          title: 'Time Slots',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Add slots e.g. "08:30 AM - 11:30 AM", "02:00 PM - 05:00 PM"',
        }),
      ],
    }),

    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Doctor',
        subtitle: subtitle || 'Ayurvedic Specialist',
        media: media,
      };
    },
  },
});
