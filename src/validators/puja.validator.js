import { z } from "zod";

export const createPujaSchema = z.object({
    title_en: z.string().min(1, "English title is required"),
    title_bn: z.string().min(1, "Bangla title is required"),
    description_en: z.string().optional().default(""),
    description_bn: z.string().optional().default(""),
    price: z.number().min(0, "Price must be 0 or greater"),
    date_en: z.string().optional().default(""),
    date_bn: z.string().optional().default(""),
    time: z.string().optional().default(""),
    type_en: z.string().optional().default(""),
    type_bn: z.string().optional().default(""),
    location_en: z.string().optional().default(""),
    location_bn: z.string().optional().default(""),
    image: z.string().optional().default(""),
    rules_en: z.string().optional().default(""),
    rules_bn: z.string().optional().default(""),
    isAvailable: z.boolean().optional().default(true)
});

export const updatePujaSchema = createPujaSchema.partial();