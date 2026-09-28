import {defineField, defineType} from 'sanity'

export const comparativePatternRow = defineType({
  name: 'comparativePatternRow',
  title: 'Comparative pattern row',
  type: 'object',
  fields: [
    defineField({name: 'countryLabel', title: 'Country / actor', type: 'string'}),
    defineField({name: 'mainArticulation', title: 'Main articulation', type: 'string'}),
    defineField({name: 'primaryThreat', title: 'Primary threat', type: 'string'}),
  ],
  preview: {
    select: {
      title: 'countryLabel',
      subtitle: 'mainArticulation',
    },
  },
})
