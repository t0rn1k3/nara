import {defineField, defineType} from 'sanity'

export const relatedTopic = defineType({
  name: 'relatedTopic',
  title: 'Related topic',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})
