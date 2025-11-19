import type { Field } from "payload";

import deepMerge from "@/lib/deep-merge";
import { defaultLexical } from "./default-lexical";

type RichTextFieldType = (options?: { overrides?: Partial<Field> }) => Field;

export const richTextField: RichTextFieldType = ({ overrides = {} } = {}) => {
  const generatedLinkGroup: Field = {
    name: "richText",
    type: "richText",
    label: "Rich Text",
    editor: defaultLexical,
  };

  return deepMerge(generatedLinkGroup, overrides);
};
