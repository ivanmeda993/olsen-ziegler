import { createOptionsFromArray } from "@/lib/create-options-from-array";
import deepMerge from "@/lib/deep-merge";
import type { Field, GroupField } from "payload";

// Dynamically extract variant options from buttonVariants
export const appearanceOptions = createOptionsFromArray([
  "default",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
]);

export const sizeOptions = createOptionsFromArray([
  "default",
  "sm",
  "lg",
  "icon",
  "icon-sm",
  "icon-lg",
]);

type LinkType = (options?: {
  appearances?: boolean;
  disableLabel?: boolean;
  overrides?: Partial<GroupField>;
}) => Field;

export const linkField: LinkType = ({
  appearances = true,
  disableLabel = false,
  overrides = {},
} = {}) => {
  const linkResult: GroupField = {
    name: "link",
    type: "group",
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: "row",
        fields: [
          {
            name: "type",
            type: "radio",
            admin: {
              layout: "horizontal",
              width: "50%",
            },
            defaultValue: "reference",
            options: [
              {
                label: "Internal link",
                value: "reference",
              },
              {
                label: "Custom URL",
                value: "custom",
              },
            ],
          },
          {
            name: "newTab",
            type: "checkbox",
            admin: {
              style: {
                alignSelf: "flex-end",
              },
              width: "50%",
            },
            label: "Open in new tab",
          },
        ],
      },
    ],
  };

  const linkTypes: Field[] = [
    {
      name: "reference",
      type: "relationship",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "reference",
      },
      label: "Document to link to",
      relationTo: ["pages", "posts"],
      required: true,
    },
    {
      name: "url",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "custom",
      },
      label: "Custom URL",
      required: true,
    },
  ];

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: "50%",
      },
    }));

    linkResult.fields.push({
      type: "row",
      fields: [
        ...linkTypes,
        {
          name: "label",
          type: "text",
          admin: {
            width: "50%",
          },
          label: "Label",
          required: true,
        },
      ],
    });
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes];
  }

  if (appearances !== false) {
    // When appearances is true, add both appearance and size fields
    if (appearances === true) {
      linkResult.fields.push({
        type: "row",
        fields: [
          {
            name: "appearance",
            type: "select",
            admin: {
              description: "Choose how the link should be rendered.",
              width: "50%",
            },
            defaultValue: "default",
            options: appearanceOptions,
          },
          {
            name: "size",
            type: "select",
            admin: {
              description: "Choose the size of the link.",
              width: "50%",
            },
            defaultValue: "default",
            options: sizeOptions,
          },
        ],
      });
    } else {
      // Default behavior: only show 'default' and 'outline' appearance options
      const defaultAppearanceOptions = appearanceOptions.filter(
        (opt) => opt.value === "default" || opt.value === "outline"
      );

      linkResult.fields.push({
        name: "appearance",
        type: "select",
        admin: {
          description: "Choose how the link should be rendered.",
        },
        defaultValue: "default",
        options: defaultAppearanceOptions,
      });
    }
  }

  return deepMerge(linkResult, overrides);
};
