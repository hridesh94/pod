// pricing.ts - Schema for pricing plans
export default {
  name: 'pricing',
  title: 'Pricing Plan',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'timeUnit',
      title: 'Time Unit',
      type: 'string',
      options: {
        list: [
          { title: 'Per Episode', value: 'per-episode' },
          { title: 'Monthly', value: 'monthly' },
          { title: 'One-time', value: 'one-time' },
        ],
      },
      initialValue: 'per-episode',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'popular',
      title: 'Popular Plan',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
    },
    prepare({ title, subtitle }: any) {
      return {
        title,
        subtitle: `$${subtitle}`,
      };
    },
  },
};
