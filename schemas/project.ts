// project.ts - Schema for project process/workflow
export default {
  name: 'project',
  title: 'Project Process',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Step Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Step Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Step Icon',
      type: 'string',
      description: 'Icon identifier for this process step',
    },
    {
      name: 'image',
      title: 'Step Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      stepNumber: 'stepNumber',
    },
    prepare({ title, stepNumber }: any) {
      return {
        title,
        subtitle: `Step ${stepNumber}`,
      };
    },
  },
};
