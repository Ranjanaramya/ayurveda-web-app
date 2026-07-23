import { defineType, defineField } from 'sanity';
import { Activity } from 'lucide-react'; // 1. Icon Import பண்ணுங்க

export default defineType({
  name: 'treatment',
  title: 'Treatments',
  type: 'document',
  icon: Activity, // 2. Document Icon-ஐ Lucide Icon-ஆகக் கொடுங்க

  fields: [
    defineField({
      name: 'name',
      title: 'Treatment Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Panchakarma', value: 'Panchakarma' },
          { title: 'Rejuvenation', value: 'Rejuvenation' },
          { title: 'Therapeutic', value: 'Therapeutic' },
          { title: 'Detox', value: 'Detox' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., 60 mins / 90 mins',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'costEstimate',
      title: 'Cost Estimate',
      type: 'string',
      description: 'e.g., $120 - $150',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Treatment Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'benefits',
      title: 'Therapeutic Benefits',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'herbsUsed',
      title: 'Key Herbs Used',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],

  // 3. Media sanitized preview
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Treatment',
        subtitle: subtitle || 'No Category',
        // Media Object-ஆக இருந்தால் மட்டும் எடுக்கும், URL String-ஆக இருந்தால் Activity Icon கொடுக்கும்
        media: media && typeof media === 'object' ? media : Activity, 
      };
    },
  },
});