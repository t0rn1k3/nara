import {defineArrayMember, defineField, defineType} from 'sanity'

export const narrativeCountryAppearance = defineType({
  name: 'narrativeCountryAppearance',
  title: 'Country appearance',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'e.g. Germany — AfD',
    }),
    defineField({
      name: 'countryIso',
      title: 'Country ISO code',
      type: 'string',
      validation: (rule) => rule.length(2).uppercase(),
    }),
    defineField({
      name: 'paragraphs',
      title: 'Body',
      type: 'array',
      of: [defineArrayMember({type: 'paragraph'})],
    }),
    defineField({
      name: 'bullets',
      title: 'Bullet points',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'structureSteps',
      title: 'Narrative structure',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Ordered steps from cause to policy response',
    }),
  ],
  preview: {
    select: {title: 'heading'},
  },
})
