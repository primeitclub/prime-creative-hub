import { defineArrayMember, defineField, defineType } from 'sanity'

const navLink = {
  type: 'object',
  name: 'navLink',
  title: 'Link',
  fields: [
    { name: 'label', type: 'string', title: 'Label', validation: (R: any) => R.required() },
    { name: 'href', type: 'string', title: 'Href', validation: (R: any) => R.required() },
    { name: 'external', type: 'boolean', title: 'External', initialValue: false },
  ],
}

export const siteNavigation = defineType({
  name: 'siteNavigation',
  title: 'Site Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'primary',
      title: 'Primary Nav',
      type: 'array',
      of: [defineArrayMember(navLink)],
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          fields: [
            { name: 'heading', type: 'string', title: 'Heading' },
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [defineArrayMember(navLink)],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Navigation' }),
  },
})
