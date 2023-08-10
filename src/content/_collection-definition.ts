import { z } from "astro:content";

export const collectionDefinitions = {
  skills: {
    type: "content",
    schema: z.object({
      image: z.string().optional(),
    }),
  },

  hobbies: {
    type: "content",
    schema: z.object({
      image: z.string().optional(),
    }),
  },

  projects: {
    type: "content",
    schema: z.object({
      title: z.string(),
      href: z.string(),
      description: z.string().max(160),
    }),
  },
} as const;