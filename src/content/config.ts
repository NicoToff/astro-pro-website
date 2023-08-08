import { z, defineCollection } from "astro:content";

const skillSchema = z.object({
  title: z.string(),
  image: z.string().optional(),
});

export type SkillType = z.infer<typeof skillSchema>;

const skillCollection = defineCollection({
  type: "content",
  schema: skillSchema,
});

export const collections = {
  skills: skillCollection,
};
