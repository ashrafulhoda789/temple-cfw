import { z } from "zod";

export const createNoticeSchema = z.object({
    title_en: z.string().min(1, "English title is required"),
    title_bn: z.string().min(1, "Bangla title is required"),
    category_en: z.string().optional().default("General"),
    category_bn: z.string().optional().default("সাধারণ"),
    description_en: z.string().min(1, "English description is required"),
    description_bn: z.string().min(1, "Bangla description is required"),
    attachmentUrl: z.string().optional().default(""),
    publishDate: z.string().min(1, "Publish date is required"),
    expiryDate: z.string().optional().default(""),
    isPinned: z.boolean().optional().default(false),
    status: z.enum(["Published", "Draft", "Archived"]).optional().default("Published")
});

export const updateNoticeSchema = createNoticeSchema.partial();