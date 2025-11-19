import { buttonVariants } from "@/components/ui/button";
import {
  extractCVAOptions,
  extractCVAOptionsAsRecord,
} from "@/lib/extract-cva-options";

// Test extraction
console.log("=== Button Variants ===");
console.log(extractCVAOptions(buttonVariants, "variant"));

console.log("\n=== Button Sizes ===");
console.log(extractCVAOptions(buttonVariants, "size"));

console.log("\n=== As Record (Variants) ===");
console.log(extractCVAOptionsAsRecord(buttonVariants, "variant"));

console.log("\n=== As Record (Sizes with transform) ===");
console.log(
  extractCVAOptionsAsRecord(buttonVariants, "size", (value) => {
    if (value.startsWith("icon")) {
      return value
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  })
);
