import React from "react";
import { TimelineBlock } from "@/payload/types/generated-payload-types";
import { CMSImageMedia } from "@/payload/blocks/media/cms-image";
import { SectionHeading } from "@/components/section-heading";
import CMSRichText from "@/payload/components/cms-rich-text/cms-rich-text";

export const CMSTimelineServer: React.FC<TimelineBlock> = (props) => {
  const { sectionTitle, title, description, items } = props;

  if (!items || items.length === 0) return null;

  return (
    <section className="py-10 w-full">
      <div className="w-full">
        {/* Section Heading */}
        <SectionHeading
          sectionTitle={sectionTitle ?? undefined}
          title={title ?? undefined}
          wrapperClassName="mb-4"
          sectionTitleClassName="text-primary"
          titleClassName="text-black font-semibold"
        />

        {/* Description */}
        {description && (
          <div className="mb-8">
            <CMSRichText
              enableGutter={false}
              enableProse={false}
              data={description}
            />
          </div>
        )}

        {/* Timeline */}
        <ol className="flex flex-col items-start sm:items-baseline sm:flex sm:flex-row">
          {items.map((item: any, index: number) => {
            const { icon, year, description: itemDescription, id } = item;
            const isLast = index === items.length - 1;

            return (
              <li
                key={id || index}
                className="list-none relative mb-6 ml-0 mr-4 sm:mb-0 w-full"
              >
                <div className="flex sm:flex-col">
                  {/* Icon + Line Container */}
                  <div className="flex flex-col w-1/6 items-center sm:flex-row sm:w-full mr-2">
                    {/* Icon */}
                    <div className="min-w-[40px] min-h-[40px] w-[40px] h-[40px]">
                      <CMSImageMedia
                        resource={icon}
                        imgClassName="w-full h-full object-contain"
                      />
                    </div>

                    {/* Connecting Line */}
                    {!isLast && (
                      <div className="w-0 h-full mt-2 sm:ml-2 border-gray-400 border-l-2 sm:border-t-2 sm:mt-0 sm:w-full min-h-14 sm:min-h-0" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="w-full sm:mt-3">
                    <h3 className="text-black text-xl mb-2">{year}</h3>
                    <p className="text-sm text-neutral-600">
                      {itemDescription}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
