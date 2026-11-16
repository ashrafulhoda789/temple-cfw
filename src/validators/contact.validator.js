import { z } from "zod";

export const createContactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    phone: z.string().optional().default(""),
    message: z.string().min(1, "Message is required"),
});

export const replyContactSchema = z.object({
    replyMessage: z.string().min(1, "Reply message cannot be empty"),
});