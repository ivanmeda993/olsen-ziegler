"use server";
import { Media } from "@/payload/types/generated-payload-types";
import { getCachedGlobal } from "@/lib/get-globals";
import Link from "next/link";
import { Logo } from "../logo/logo";
import { HeaderClient } from "./header-client";
import { CMSLink } from "../link/cms-link";

export const HeaderServer = async () => {
  const headerData = await getCachedGlobal("header", 1)();

  return (
    <header className="container relative z-20 bg-white border-b border-gray-200">
      <div className="py-4 flex items-center">
        {/* Logo - Left */}
        <div className="shrink-0">
          <Link href="/">
            <Logo logo={headerData?.logo as Media} />
          </Link>
        </div>

        {/* Navigation - Center */}
        <div className="flex-1 flex justify-center">
          <HeaderClient data={headerData} />
        </div>

        {/* CTA - Right */}
        <div className="shrink-0">
          {headerData?.cta && (
            <CMSLink
              {...headerData.cta}
              appearance={headerData.cta.appearance ?? "default"}
              size={headerData.cta.size ?? "default"}
            />
          )}
        </div>
      </div>
    </header>
  );
};
