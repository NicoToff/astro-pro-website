/// Don't edit this file! To define new collections, go to ./_collection-definition.ts
/// This process ensures that the return type of `getParsedCollection` is always correct

import { defineCollection } from "astro:content";
import { collectionDefinitions } from "./_collection-definition";

const allCollections = Object.entries(collectionDefinitions).map(([name, args]) => {
  return { name, collection: defineCollection(args) };
});

export const collections = Object.fromEntries(allCollections.map(({ name, collection }) => [name, collection]));
