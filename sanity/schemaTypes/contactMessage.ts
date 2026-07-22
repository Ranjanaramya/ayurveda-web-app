import { defineField, defineType } from 'sanity';

export const contactMessage = defineType({
  name: 'contactMessage',
  title: 'Contact Us Messages',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone / WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'createdAt',
      title: 'Submitted At',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'Pending',
      options: {
        list: [
          { title: 'Pending', value: 'Pending' },
          { title: 'Contacted', value: 'Contacted' },
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      return {
        title: title || 'No Name',
        subtitle: `${subtitle || ''} [${status || 'Pending'}]`,
      };
    },
  },
});
