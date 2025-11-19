import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  sectionTitle?: string;
  title?: string;
  className?: string;
  sectionTitleClassName?: string;
  titleClassName?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  sectionTitle,
  title,
  className,
  sectionTitleClassName,
  titleClassName,
}) => {
  if (!sectionTitle && !title) return null;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {sectionTitle && (
        <p
          className={cn(
            "text-primary font-bold text-sm md:text-base  tracking-wide",
            sectionTitleClassName
          )}
        >
          {sectionTitle}
        </p>
      )}

      {title && (
        <h2
          className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight",
            titleClassName
          )}
        >
          {title}
        </h2>
      )}
    </div>
  );
};
