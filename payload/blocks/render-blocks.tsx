import React, { Fragment } from "react";

import type { Page } from "@/payload/types/generated-payload-types";
import { CMSMediaBlock } from "./media/cms-media-block";
import { CMSContentWithImageServer } from "@/module/pages/blocks/content-with-image/content-with-image-server";

const blockComponents = {
  mediaBlock: CMSMediaBlock,
  contentWithImage: CMSContentWithImageServer,
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-ignore */}
                  <Block {...block} />
                </div>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
