import {defineArrayMember, defineField, defineType} from 'sanity'

export const source = defineType({
  name: 'source',
  title: 'Source',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'url', title: 'URL', type: 'url'}),
    defineField({name: 'publisher', title: 'Publisher', type: 'string'}),
    defineField({name: 'publishedAt', title: 'Published at', type: 'date'}),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
  ],
})
