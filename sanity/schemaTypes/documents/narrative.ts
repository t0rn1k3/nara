import {defineArrayMember, defineField, defineType} from 'sanity'

export const narrative = defineType({
  name: 'narrative',
  title: 'Narrative',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
    }),
    defineField({
      name: 'overview',
      title: 'Overview / definition',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'body',
      title: 'Body (legacy portable text)',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'countries',
      title: 'Countries (ISO codes)',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'parties',
      title: 'Political parties',
      type: 'array',
      of: [defineArrayMember({type: 'party'})],
    }),
    defineField({
      name: 'partiesNote',
      title: 'Political parties — note',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent color',
      type: 'string',
      initialValue: '#9B6B6B',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'countryAppearances',
      title: 'How the narrative appears',
      type: 'array',
      of: [defineArrayMember({type: 'narrativeCountryAppearance'})],
    }),
    defineField({
      name: 'comparativePatternIntro',
      title: 'Comparative pattern — introduction',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'comparativePatternOutro',
      title: 'Comparative pattern — closing note',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'comparativePattern',
      title: 'Comparative pattern',
      type: 'array',
      of: [defineArrayMember({type: 'comparativePatternRow'})],
    }),
    defineField({
      name: 'commonElements',
      title: 'Common narrative elements',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'contextSpecificElements',
      title: 'Context-specific elements',
      type: 'array',
      of: [defineArrayMember({type: 'contextSpecificElement'})],
    }),
    defineField({
      name: 'relatedTopics',
      title: 'Related narrative topics',
      type: 'array',
      of: [defineArrayMember({type: 'relatedTopic'})],
    }),
    defineField({
      name: 'comparativeTakeaway',
      title: 'Comparative takeaway',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'relatedNarratives',
      title: 'Related narratives',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'narrative'}]})],
    }),
    defineField({
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'source'}]})],
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'slug.current'},
  },
})
