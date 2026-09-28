import {defineField, defineType} from 'sanity'

export const paragraph = defineType({
  name: 'paragraph',
  title: 'Paragraph',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {text: 'text'},
    prepare({text}) {
      return {title: text?.slice(0, 80) ?? 'Paragraph'}
    },
  },
})
