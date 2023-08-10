import { getCollection } from "astro:content";
import type { Render } from "astro:content";
import type { CollectionName, Frontmatter } from "@/types/collections";

/**
 * Type-safe wrapper around `getCollection` that returns parsed content and frontmatter for all entries in a given `collection`
 * @param collection
 * @returns An array of objects with `frontmatter` and `Content` properties.
 * @example
    --- 
    import { getParsedCollection } from "@/lib/helpers";
    const parsedEntries = await getParsedCollection("hobbies");
    ---
    <Layout>
    {
        parsedEntries.map(({ Content, frontmatter }) => (
            <Content />
            <img src="{frontmatter.image}" />
        ))
    }
    </Layout>
 */
export async function getParsedCollection<C extends CollectionName>(collection: C) {
  const entries = await getCollection<CollectionName>(collection);
  return await Promise.all(
    entries.map(async (item) => {
      const { remarkPluginFrontmatter: frontmatter, Content } = await item.render();
      return {
        frontmatter: frontmatter as Frontmatter<C>,
        Content: Content as Awaited<Render[".md"]>["Content"],
      };
    })
  );
}
