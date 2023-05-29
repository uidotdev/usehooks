import { defineCollection, z, reference } from 'astro:content';

export const collections = {
  hooks: defineCollection({
    schema: z.object({
      experimental: z.boolean().optional(),
      draft: z.boolean().default(false),
      sandboxId: z.string().optional(),
      previewHeight: z.string().optional(),
      name: z.string(),
      tagline: z.string(),
      ogImage: z.string().optional(),
      rank: z.number(),
      relatedHooks: z.array(
        reference('hooks').optional()
      ).optional(),
    }),
  }),
};