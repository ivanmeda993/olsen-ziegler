import React from "react";
import { ContentWithImageBlock } from "@/payload/types/generated-payload-types";
import { cn } from "@/lib/utils";
import { CMSImageMedia } from "@/payload/blocks/media/cms-image";
import CMSRichText from "@/payload/components/cms-rich-text/cms-rich-text";
import { SectionHeading } from "@/components/section-heading";

export const CMSContentWithImageServer: React.FC<ContentWithImageBlock> = (
  props
) => {
  const { richText, media, mediaPosition, sectionTitle, title } = props;

  return (
    <section className="py-10">
      <div
        className={cn(
          "container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start",
          mediaPosition === "right" && "md:grid-flow-dense"
        )}
      >
        {/* Image Column - Equal width */}
        <div
          className={cn(
            "w-full",
            mediaPosition === "right" && "md:col-start-2"
          )}
        >
          <CMSImageMedia resource={media} imgClassName="w-full  rounded-lg " />
        </div>

        {/* Content Column - Equal width */}
        <div
          className={cn(
            "flex flex-col h-full ",
            mediaPosition === "right" && "md:col-start-1 md:row-start-1"
          )}
        >
          {/* Section Heading - Separated from richtext */}
          <SectionHeading
            sectionTitle={sectionTitle}
            title={title}
            className="mb-8"
          />

          {/* Rich Text Content - Completely separated */}
          <div className="prose prose-lg max-w-none text-base leading-relaxed text-neutral-700">
            <CMSRichText
              enableGutter={false}
              enableProse={true}
              data={richText}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
