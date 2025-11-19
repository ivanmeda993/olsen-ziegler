import type { ClassValue } from "class-variance-authority/types";

type CVAConfig = {
  base?: ClassValue;
  variants?: Record<string, Record<string, ClassValue>>;
  compoundVariants?: Array<unknown>;
  defaultVariants?: Record<string, string>;
};

/**
 * Extracts variant keys from a CVA (class-variance-authority) config
 * and converts them to Payload CMS select options format
 *
 * @param cvaFunction - The CVA function (e.g., buttonVariants)
 * @param variantName - The name of the variant to extract (e.g., "variant", "size")
 * @param labelTransform - Optional function to transform the value into a label
 * @returns Array of {label, value} objects for Payload CMS
 *
 * @example
 * const variantOptions = extractCVAOptions(buttonVariants, "variant");
 * // Returns: [{label: "Default", value: "default"}, {label: "Outline", value: "outline"}, ...]
 */
export function extractCVAOptions(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cvaFunction: any,
  variantName: string,
  labelTransform?: (value: string) => string
): Array<{ label: string; value: string }> {
  const config = cvaFunction.config as CVAConfig | undefined;
  console.log("config", config);

  if (!config?.variants?.[variantName]) {
    console.warn(
      `No variants found for "${variantName}" in CVA config. Returning empty array.`
    );
    return [];
  }

  const variantKeys = Object.keys(config.variants[variantName]);

  return variantKeys.map((key) => ({
    label: labelTransform
      ? labelTransform(key)
      : key.charAt(0).toUpperCase() + key.slice(1),
    value: key,
  }));
}

/**
 * Creates a Record mapping from variant values to Payload options
 * Useful for creating typed appearance options objects
 *
 * @example
 * const appearanceOptions = extractCVAOptionsAsRecord(buttonVariants, "variant");
 * // Returns: { default: {label: "Default", value: "default"}, ... }
 */
export function extractCVAOptionsAsRecord<T extends string>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cvaFunction: any,
  variantName: string,
  labelTransform?: (value: string) => string
): Record<T, { label: string; value: string }> {
  const options = extractCVAOptions(cvaFunction, variantName, labelTransform);

  return options.reduce((acc, option) => {
    acc[option.value as T] = option;
    return acc;
  }, {} as Record<T, { label: string; value: string }>);
}
