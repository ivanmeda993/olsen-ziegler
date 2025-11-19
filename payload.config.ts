// storage-adapter-import-placeholder

import sharp from "sharp";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig, PayloadRequest } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getServerSideURL } from "./lib/get-url";
import { Users } from "./payload/schemas/collections/users/user-collection";
import { defaultPlugins } from "./payload/plugins/default-plugins";
import { defaultLexical } from "./payload/fields/default-lexical";
import { Media } from "./payload/schemas/collections/media/media-collection";
import { Pages } from "./payload/schemas/collections/pages/page-collection";
import { Categories } from "./payload/schemas/collections/categories/categories-collection";
import { Posts } from "./payload/schemas/collections/posts/post-collection";
import { Header } from "./payload/schemas/globals/header/header-global";
import { SiteConfig } from "./payload/schemas/globals/site-config/site-config-globals";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  collections: [Pages, Users, Posts, Media, Categories],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [SiteConfig, Header],
  plugins: [
    ...defaultPlugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET!,
  sharp,
  typescript: {
    outputFile: path.resolve(
      dirname,
      "payload/types/generated-payload-types.ts"
    ),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true;

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get("authorization");
        return authHeader === `Bearer ${process.env.CRON_SECRET}`;
      },
    },
    tasks: [],
  },
});
