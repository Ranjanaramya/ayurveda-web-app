import { defineType, defineField } from 'sanity';
import { Images } from 'lucide-react';

export default defineType({
  name: 'gallery',
  title: 'Gallery Items',
  type: 'document',
  icon: Images,
  fields: [
    defineField({
      name: 'title',
      title: 'Title / Caption',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Hospital', value: 'Hospital' },
          { title: 'Herbal Garden', value: 'Herbal Garden' },
          { title: 'Yoga & Meditation', value: 'Yoga & Meditation' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
});