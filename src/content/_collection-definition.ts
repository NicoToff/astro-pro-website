import { z } from "astro:content";

const title = { title: z.string() };

const titleOnly = z.object({
  ...title,
});

const titleImage = z.object({
  ...title,
  image: z.string(),
});

const titleBothImages = z.object({
  ...title,
  imageOnLight: z.string(),
  imageOnDark: z.string(),
});

export const collectionDefinitions = {
  skills: {
    type: "content",
    schema: z.union([titleOnly, titleImage, titleBothImages]),
  },

  hobbies: {
    type: "content",
    schema: z.union([titleOnly, titleImage, titleBothImages]),
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
      repo: z.string().optional(),
    }),
  },
} as const;
