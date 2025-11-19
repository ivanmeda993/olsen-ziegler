import type { StaticImageData } from "next/image";

import React from "react";

import type { MediaBlock as MediaBlockProps } from "@/payload/types/generated-payload-types";
import { cn } from "@/lib/utils";
import { CMSMedia } from "./cms-media";
import CMSRichText from "@/payload/components/cms-rich-text/cms-rich-text";

type Props = MediaBlockProps & {
  breakout?: boolean;
  captionClassName?: string;
  className?: string;
  enableGutter?: boolean;
  imgClassName?: string;
  staticImage?: StaticImageData;
  disableInnerContainer?: boolean;
};

export const CMSMediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props;

  let caption;
  if (media && typeof media === "object") caption = media.caption;

  return (
    <div
      className={cn(
        "",
        {
          container: enableGutter,
        },
        className
      )}
    >
      {(media || staticImage) && (
        <CMSMedia
          imgClassName={cn(
            "border border-border rounded-[0.8rem]",
            imgClassName
          )}
          resource={media}
          src={staticImage}
        />
      )}
      {caption && (
        <div
          className={cn(
            "mt-6",
            {
              container: !disableInnerContainer,
            },
            captionClassName
          )}
        >
          <CMSRichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  );
};
