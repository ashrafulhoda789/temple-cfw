import { z } from "zod";

export const createCommitteeSchema = z.object({
  name_en: z.string().min(1, "English name is required"),
  name_bn: z.string().min(1, "Bangla name is required"),
  position_en: z.string().min(1, "English position is required"),
  position_bn: z.string().min(1, "Bangla position is required"),
  photo_url: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  email: z.string().optional().default(""),
  display_order: z.number().int().optional().default(0),
});

export const updateCommitteeSchema = createCommitteeSchema.partial();