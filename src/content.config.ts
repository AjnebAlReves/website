import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        author: z.string().optional(),
        pubDate: z.coerce.date().optional(),
        publishDate: z.coerce.date().optional(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).optional(),
        heroImage: z.string().optional(),
        slug: z.string().optional(),
    }),
});

export const collections = { blog };
