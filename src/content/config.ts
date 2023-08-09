import { z, defineCollection } from "astro:content";

const collectionDefinitions = {
  skills: {
    type: "content",
    schema: z.object({
      image: z.string().optional(),
    }),
  } as const,

  hobbies: {
    type: "content",
    schema: z.object({
      image: z.string().optional(),
      facebook: z.string().optional(),
      instagram: z.string().optional(),
    }),
  } as const,
};

const allCollections = Object.entries(collectionDefinitions).map(([name, args]) => {
  return { name, collection: defineCollection(args) };
});

export const collections = Object.fromEntries(allCollections.map(({ name, collection }) => [name, collection]));

export type CollectionName = keyof typeof collectionDefinitions;

type FrontmatterType = {
  [key in keyof typeof collectionDefinitions]: z.infer<(typeof collectionDefinitions)[key]["schema"]>;
};

export type Frontmatter<F extends CollectionName> = FrontmatterType[F];
