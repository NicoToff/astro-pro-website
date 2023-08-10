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
      shortDescription: z.string().max(50),
      technologies: z.array(z.string()),
      projectUrl: z.string().optional(),
    }),
  },
} as const;
