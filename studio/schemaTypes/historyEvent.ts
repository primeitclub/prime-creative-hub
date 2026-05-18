import { defineField, defineType } from 'sanity'

export const historyEvent = defineType({
  name: 'historyEvent',
  title: 'History Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(1000),
    }),
    defineField({
      name: 'startYear',
      title: 'Start Year',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1900),
    }),
    defineField({
      name: 'endYear',
      title: 'End Year',
      type: 'number',
      validation: (Rule) => Rule.integer().min(1900),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Year (desc)',
      name: 'yearDesc',
      by: [
        { field: 'startYear', direction: 'desc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'startYear' },
  },
})
