import type { ArrayField, Field } from "payload";

import { linkField } from "./link-filed";
import deepMerge from "@/lib/deep-merge";

type LinkGroupType = (options?: {
  appearances?: boolean;
  overrides?: Partial<ArrayField>;
}) => Field;

export const linkGroupField: LinkGroupType = ({
  appearances,
  overrides = {},
} = {}) => {
  const generatedLinkGroup: Field = {
    name: "links",
    type: "array",
    fields: [
      linkField({
        appearances,
      }),
    ],
    admin: {
      initCollapsed: true,
    },
  };

  return deepMerge(generatedLinkGroup, overrides);
};
