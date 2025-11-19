import configPromise from "@payload-config";
import { getPayload, GlobalSlug, DataFromGlobalSlug } from "payload";
import { unstable_cache } from "next/cache";

async function getGlobal<T extends GlobalSlug>(
  slug: T,
  depth = 0
): Promise<DataFromGlobalSlug<T>> {
  const payload = await getPayload({ config: configPromise });

  const global = await payload.findGlobal({
    slug,
    depth,
  });

  return global as DataFromGlobalSlug<T>;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug.
 * The return type is automatically inferred based on the slug parameter.
 *
 * @example
 * const headerData = await getCachedGlobal("header", 1)(); // Returns Header type
 * const siteConfig = await getCachedGlobal("site-config", 2)(); // Returns SiteConfig type
 */
export const getCachedGlobal = <T extends GlobalSlug>(slug: T, depth = 0) =>
  unstable_cache(
    async (): Promise<DataFromGlobalSlug<T>> => getGlobal(slug, depth),
    [slug],
    {
      tags: [`global_${slug}`],
    }
  );
