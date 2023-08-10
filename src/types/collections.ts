import type { collectionDefinitions } from "@/content/_collection-definition";
import type { z } from "astro:content";

export type CollectionName = keyof typeof collectionDefinitions;
export type Frontmatter<TCollection extends CollectionName> = {
  [key in TCollection]: z.infer<(typeof collectionDefinitions)[key]["schema"]>;
}[TCollection];
