import { z } from "zod";

const heroSchema = z.object({
    title_en: z.string().min(1, "English title is required"),
    title_bn: z.string().min(1, "Bangla title is required"),
    description_en: z.string().optional().default(""),
    description_bn: z.string().optional().default(""),
    images: z.array(
        z.object({
            url: z.string().url("Invalid image URL"),
            caption_en: z.string().optional().default(""),
            caption_bn: z.string().optional().default("")
        })
    ).optional().default([])
});


const aartiItemSchema = z.object({
    title_en: z.string().min(1, "Aarti English title is required"),
    title_bn: z.string().min(1, "Aarti Bangla title is required"),
    description_en: z.string().optional().default(""),
    description_bn: z.string().optional().default(""),
    time: z.string().optional().default(""),
    start: z.string().optional().default(""),
    end: z.string().optional().default("")
});

const aboutSchema = z.object({
    introduction: z.string().optional().default(""),
    committeeOverview: z.string().optional().default(""),
    members: z.array(z.any()).optional().default([]),
    messages: z.array(z.any()).optional().default([])
});


const historySchema = z.object({
    templeHistory: z.string().optional().default(""),
    mohashoshanHistory: z.string().optional().default("")
});


const templeTimingsSchema = z.object({
    openingTime: z.string().optional().default(""),
    closingTime: z.string().optional().default(""),
    status: z.string().optional().default("")
});

export const updateContentSchema = z.object({
    hero: heroSchema.optional(),
    arthiSchedule: z.array(aartiItemSchema).optional(),
    about: aboutSchema.optional(),
    history: historySchema.optional(),
    deities: z.array(z.any()).optional(),
    templeTimings: templeTimingsSchema.optional()
});