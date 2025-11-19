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
      name: "navItems",
      type: "array",
      fields: [
        linkField({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
