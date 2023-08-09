import { z, defineCollection } from "astro:content";

const skillSchema = z.object({
  image: z.string().optional(),
});

export type SkillType = z.infer<typeof skillSchema>;

const skillCollection = defineCollection({
  type: "content",
  schema: skillSchema,
});

const hobbySchema = z.object({
  image: z.string().optional(),
});

export type HobbyType = z.infer<typeof hobbySchema>;

const hobbyCollection = defineCollection({
  type: "content",
  schema: hobbySchema,
});

export const collections = {
  skills: skillCollection,
  hobbies: hobbyCollection,
};
