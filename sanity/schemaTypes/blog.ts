import { defineField, defineType } from 'sanity';

export const blog = defineType({
  name: 'blog',
  title: 'Health Tips Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Snippet',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Markdown Content',
      type: 'text',
    }),
    defineField({
      name: 'author',
      title: 'Author Profile',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Name', type: 'string' }),
        defineField({ name: 'role', title: 'Role', type: 'string' }),
        defineField({ name: 'avatar', title: 'Avatar URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'date',
    }),
    defineField({
      name: 'category',
      title: 'Main Category',
      type: 'string',
    }),
    defineField({
      name: 'readTime',
      title: 'Est. Read Time',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image URL',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      title: 'Search Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
