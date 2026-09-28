import {defineArrayMember, defineField, defineType} from 'sanity'

export const enquiryLink = defineType({
  name: 'enquiryLink',
  title: 'Enquiry link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string'}),
    defineField({name: 'subject', title: 'Email subject', type: 'string'}),
  ],
})

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  fields: [
    defineField({name: 'heading', title: 'Heading', type: 'string'}),
    defineField({name: 'introduction', title: 'Introduction', type: 'text'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({
      name: 'enquiryLinks',
      title: 'Enquiry links',
      type: 'array',
      of: [defineArrayMember({type: 'enquiryLink'})],
    }),
  ],
})
