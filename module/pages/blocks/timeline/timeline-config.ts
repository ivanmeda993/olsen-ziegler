import type { Block } from "payload";

export const TimelineConfig: Block = {
  slug: "timeline",
  interfaceName: "TimelineBlock",
  fields: [
    {
      type: "text",
      name: "sectionTitle",
      label: "Section Title",
    },
    {
      type: "text",
      name: "title",
      label: "Title",
      required: true,
    },
    {
      type: "richText",
      name: "description",
      label: "Description",
    },
    {
      name: "items",
      type: "array",
      label: "Timeline Items",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "icon",
          type: "upload",
          relationTo: "media",
          label: "Icon",
          required: true,
        },
        {
          name: "year",
          type: "text",
          label: "Year",
          required: true,
        },
        {
          name: "description",
          type: "text",
          label: "Description",
          required: true,
        },
      ],
    },
  ],
};
