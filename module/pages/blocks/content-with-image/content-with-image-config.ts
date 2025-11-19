import { richTextField } from "@/payload/fields/rich-text-filed";
import type { Block } from "payload";

export const ContentWithImageConfig: Block = {
  slug: "contentWithImage",
  interfaceName: "ContentWithImageBlock",
  fields: [
    {
      type: "text",
      name: "sectionTitle",
      label: "Section Title",
      required: true,
    },
    {
      type: "text",
      name: "title",
      label: "Title",
      required: true,
    },
    richTextField({
      overrides: {
        required: true,
      },
    }),
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "mediaPosition",
      type: "select",
      defaultValue: "left",
      options: [
        {
          label: "Left",
          value: "left",
        },
        {
          label: "Right",
          value: "right",
        },
      ],
    },
  ],
};
