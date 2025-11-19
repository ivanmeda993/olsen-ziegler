import configPromise from "@payload-config";
import { getPayload, CollectionSlug, DataFromCollectionSlug } from "payload";
import { unstable_cache } from "next/cache";

async function getDocument<T extends CollectionSlug>(
  collection: T,
  slug: string,
  depth = 0
): Promise<DataFromCollectionSlug<T> | undefined> {
  const payload = await getPayload({ config: configPromise });

  const page = await payload.find({
    collection,
    depth,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return page.docs[0] as DataFromCollectionSlug<T> | undefined;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedDocument = <T extends CollectionSlug>(
  collection: T,
  slug: string
) =>
  unstable_cache(
    async () => getDocument(collection, slug),
    [collection, slug],
    {
      tags: [`${collection}_${slug}`],
    }
  );
