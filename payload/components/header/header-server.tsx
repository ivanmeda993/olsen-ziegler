"use server";
import { Media } from "@/payload/types/generated-payload-types";
import { getCachedGlobal } from "@/lib/get-globals";
import Link from "next/link";
import { Logo } from "../logo/logo";
import { HeaderClient } from "./header-client";

export const HeaderServer = async () => {
  const headerData = await getCachedGlobal("header", 1)();
  const siteConfigData = await getCachedGlobal("site-config", 2)();

  return (
    <header className="container relative z-20 bg-white border-b border-gray-200">
      <div className="py-4 flex justify-between items-center">
        <Link href="/">
          <Logo logo={siteConfigData.logo as Media} />
        </Link>

        <HeaderClient data={headerData} />
      </div>
    </header>
  );
};
