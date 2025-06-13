// testimonial.ts - Schema for testimonials
export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'clientTitle',
      title: 'Client Title',
      type: 'string',
      description: 'e.g. "Podcast Host, Tech Talk Show"',
    },
    {
      name: 'avatar',
      title: 'Client Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Testimonial Content',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(5),
      initialValue: 5,
    },
    {
      name: 'projectReference',
      title: 'Related Project',
      type: 'reference',
      to: [{ type: 'portfolio' }],
    },
    {
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'clientTitle',
      media: 'avatar',
    },
  },
};
