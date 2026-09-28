import {defineField, defineType} from 'sanity'

export const contextSpecificElement = defineType({
  name: 'contextSpecificElement',
  title: 'Context-specific element',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string'}),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'description'},
  },
})
