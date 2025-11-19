import { CMSImageMedia } from "@/payload/blocks/media/cms-image";
import { Media } from "@/payload/types/generated-payload-types";

interface LogoProps {
  logo: Media;
}
export const Logo = ({ logo }: LogoProps) => {
  return (
    <CMSImageMedia
      resource={logo}
      imgClassName="h-12 w-auto object-contain"
      priority
    />
  );
};
