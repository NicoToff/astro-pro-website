import { cn } from "@/lib/utils";
import { dataAttributes } from "@/lib/constants";
import type { Frontmatter } from "@/types/collections";

type SideBySidePageContentProps = {
  frontmatter: Frontmatter<"hobbies" | "skills">;
  index: number;
  className?: string;
  children?: React.ReactNode;
};
export function SideBySidePageContent({ frontmatter, className, children, index }: SideBySidePageContentProps) {
  const Heading = index === 0 ? "h1" : "h2";
  return (
    <div className={cn("md:flex md:items-center even:md:flex-row-reverse", className)}>
      <div className={!hasNoImg(frontmatter) ? "basis-3/4" : undefined}>
        <Heading>{frontmatter.title}</Heading>
        {children}
      </div>
      {"image" in frontmatter ? (
        <SideImage image={frontmatter.image} />
      ) : "imageOnDark" in frontmatter ? (
        <>
          <SideImage image={frontmatter.imageOnLight} props={dataAttributes.imageOnLight.props} />
          <SideImage image={frontmatter.imageOnDark} props={dataAttributes.imageOnDark.props} />
        </>
      ) : null}
    </div>
  );
}

type SideImageProps = {
  image: string | string[] | undefined;
  props?: { [key: string]: string };
};
function SideImage({ image, props }: SideImageProps) {
  if (!image) return null;
  const isArray = Array.isArray(image);
  return (
    <div
      className={cn(
        "hidden md:p-4",
        isArray ? "items-center md:grid md:basis-1/2 md:grid-cols-2 md:gap-2" : "md:block md:basis-1/4"
      )}
      {...props}
    >
      {!isArray ? (
        <img src={image} alt="" loading="lazy" />
      ) : (
        image.map((img) => <img key={img} src={img} alt="" loading="lazy" />)
      )}
    </div>
  );
}

function hasNoImg(obj: Frontmatter<"hobbies" | "skills">) {
  const keys = Object.keys(obj);
  return keys.every((k) => !k.includes("image"));
}
