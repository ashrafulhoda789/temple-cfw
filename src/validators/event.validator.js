import { z } from "zod";

export const activityItemSchema = z.object({
    time: z.string().min(1, "Time is required"),
    name_en: z.string().min(1, "Activity name (EN) is required"),
    name_bn: z.string().min(1, "Activity name (BN) is required"),
});

export const scheduleItemSchema = z.object({
    day_label_en: z.string().min(1, "Day label (EN) is required"),
    day_label_bn: z.string().min(1, "Day label (BN) is required"),
    schedule_date: z.string().min(1, "Schedule date is required"),
    day_title_en: z.string().optional().default(""),
    day_title_bn: z.string().optional().default(""),
    activities: z.array(activityItemSchema).optional().default([]),
});

export const createEventSchema = z.object({
    title_en: z.string().min(1, "English title is required"),
    title_bn: z.string().min(1, "Bangla title is required"),
    category_en: z.string().optional().default(""),
    category_bn: z.string().optional().default(""),
    description_en: z.string().optional().default(""),
    description_bn: z.string().optional().default(""),
    coverImage: z.string().optional().default(""),
    eventDateTime: z.string().min(1, "Event date time is required"),
    location_en: z.string().optional().default(""),
    location_bn: z.string().optional().default(""),
    organizer_en: z.string().optional().default(""),
    organizer_bn: z.string().optional().default(""),
    isRegistrationRequired: z.boolean().optional().default(false),
    registrationDeadline: z.string().optional().default(""),
    eventStatus: z.enum(["Upcoming", "Ongoing", "Completed", "Cancelled"]).optional().default("Upcoming"),
    schedules: z.array(scheduleItemSchema).optional().default([])
});

export const updateEventSchema = createEventSchema.partial();