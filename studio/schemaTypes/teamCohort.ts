import { defineField, defineType } from 'sanity'

export const teamCohort = defineType({
  name: 'teamCohort',
  title: 'Team Cohort',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      description: 'Display label, e.g. "2024-2025"',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      name: 'isCurrent',
      title: 'Current cohort',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Start Year (desc)',
      name: 'startYearDesc',
      by: [{ field: 'startYear', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'label', subtitle: 'startYear' },
  },
})
