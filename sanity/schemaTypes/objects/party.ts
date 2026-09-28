import {defineField, defineType} from 'sanity'

export const party = defineType({
  name: 'party',
  title: 'Political party',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({
      name: 'iso',
      title: 'Country ISO code',
      type: 'string',
      validation: (rule) => rule.length(2).uppercase(),
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'iso'},
  },
})
