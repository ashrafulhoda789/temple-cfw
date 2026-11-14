import { z } from "zod";

export const createAlbumSchema = z.object({
  title_en: z.string().min(1, "English title is required"),
  title_bn: z.string().min(1, "Bangla title is required"),
  description_en: z.string().optional().default(""),
  description_bn: z.string().optional().default(""),
  coverImage: z.string().optional().default(""),
});

export const updateAlbumSchema = createAlbumSchema.partial();

export const createMediaSchema = z.object({
  albumId: z.string().optional().nullable(),
  title_en: z.string().optional().default(""),
  title_bn: z.string().optional().default(""),
  caption_en: z.string().optional().default(""),
  caption_bn: z.string().optional().default(""),
  mediaUrl: z.string().min(1, "Media URL is required"),
  mediaType: z.enum(["image", "video"]).default("image"),
  isFeaturedVideo: z.boolean().optional().default(false),
});

export const updateMediaSchema = createMediaSchema.partial();