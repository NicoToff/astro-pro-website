import { z } from "astro:content";

export const collectionDefinitions = {
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
    }),
  } as const,
};
