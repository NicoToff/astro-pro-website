import type { Frontmatter } from "@/types/collections";

export type ProjectInfo = Pick<Frontmatter<"projects">, "title" | "href" | "description">[];
