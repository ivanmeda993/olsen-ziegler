import {
  generatePagesMetadata,
  generatePagesStaticParams,
  getPageBySlug,
} from "@/module/pages/api/get-page";
import { RenderBlocks } from "@/payload/blocks/render-blocks";
import { Metadata } from "next";
import { RequiredDataFromCollectionSlug } from "payload";

interface Props {
  params: Promise<{
    slug?: string;
  }>;
}

export async function generateStaticParams() {
  return generatePagesStaticParams();
}
export async function generateMetadata({
  params: paramsPromise,
}: Props): Promise<Metadata> {
  return generatePagesMetadata({ params: paramsPromise });
}

export default async function Page({ params }: Props) {
  const { slug = "home" } = await params;

  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug);

  const page: RequiredDataFromCollectionSlug<"pages"> | null =
    await getPageBySlug({
      slug: decodedSlug,
    });

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <div>
      <h1>{page.title}</h1>
      <RenderBlocks blocks={page.layout} />
    </div>
  );
}
