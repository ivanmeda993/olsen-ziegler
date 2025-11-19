"use client";
import { Header } from "@/payload/types/generated-payload-types";
import { CMSLink } from "../link/cms-link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const HeaderClient = ({ data }: { data: Header }) => {
  const { navItems } = data;
  const pathname = usePathname();

  return (
    <nav className="flex gap-8 items-center">
      {navItems?.map(({ link }, i) => {
        // Determine if this link is active
        const href =
          link.type === "reference" &&
          typeof link.reference?.value === "object" &&
          link.reference.value.slug
            ? `${
                link.reference?.relationTo !== "pages"
                  ? `/${link.reference?.relationTo}`
                  : ""
              }/${link.reference.value.slug}`
            : link.url;

        const isActive = pathname === href;

        return (
          <div key={i} className="relative py-2">
            <CMSLink
              {...link}
              appearance="link"
              className={cn(
                "uppercase text-sm tracking-wide transition-colors",
                isActive ? "text-primary" : "text-gray-800 hover:text-primary"
              )}
            />
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary" />
            )}
          </div>
        );
      })}
    </nav>
  );
};
