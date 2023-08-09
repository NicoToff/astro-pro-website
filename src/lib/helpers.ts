import { getCollection } from "astro:content";
import type { Render } from "astro:content";
import type { CollectionName, Frontmatter } from "@/content/config";

export async function getParsedCollection<C extends CollectionName>(collection: C) {
  const entries = await getCollection<CollectionName>(collection);
  return await Promise.all(
    entries.map(async (skill) => {
      const { Content, remarkPluginFrontmatter: frontmatter } = await skill.render();
      return {
        Content: Content as Awaited<Render[".md"]>["Content"],
        frontmatter: frontmatter as Frontmatter<C>,
      };
    })
  );
}
