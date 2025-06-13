// tool.ts - Schema for tools used
export default {
  name: 'tool',
  title: 'Tool',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Tool Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Tool Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Audio Editing', value: 'audio-editing' },
          { title: 'Video Editing', value: 'video-editing' },
          { title: 'Recording', value: 'recording' },
          { title: 'Distribution', value: 'distribution' },
          { title: 'Design', value: 'design' },
          { title: 'AI Tools', value: 'ai' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'string',
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
      subtitle: 'category',
      media: 'logo',
    },
  },
};
