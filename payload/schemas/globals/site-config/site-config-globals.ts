import type { GlobalConfig } from "payload";

import { revalidateSiteConfig } from "./hooks/revalidate-site-config";

export const SiteConfig: GlobalConfig = {
  slug: "site-config",
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
  ],
  hooks: {
    afterChange: [revalidateSiteConfig],
  },
};
