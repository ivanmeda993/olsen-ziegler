import type { GlobalConfig } from "payload";

import { linkField } from "@/payload/fields/link-filed";
import { revalidateHeader } from "./hooks/revalidate-header";

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "navItems",
      type: "array",
      fields: [linkField({})],
      maxRows: 6,
    },
    linkField({
      overrides: {
        name: "cta",
      },
    }),
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
