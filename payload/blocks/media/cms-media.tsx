import React, { Fragment } from "react";
import { CMSVideoMedia } from "./cms-video";
import { CMSImageMedia } from "./cms-image";
import { MediaBlockProps } from "./media-types";

export const CMSMedia: React.FC<MediaBlockProps> = (props) => {
  const { className, htmlElement = "div", resource } = props;

  const isVideo =
    typeof resource === "object" && resource?.mimeType?.includes("video");
  const Tag = htmlElement || Fragment;

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <CMSVideoMedia {...props} /> : <CMSImageMedia {...props} />}
    </Tag>
  );
};
