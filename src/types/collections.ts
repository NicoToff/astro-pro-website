import type { collectionDefinitions } from "@/content/_collection-definition";
import type { z } from "astro:content";

type FrontmatterType = {
  [key in keyof typeof collectionDefinitions]: z.infer<(typeof collectionDefinitions)[key]["schema"]>;
};
export type CollectionName = keyof typeof collectionDefinitions;
export type Frontmatter<F extends CollectionName> = FrontmatterType[F];
