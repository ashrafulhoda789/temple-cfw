import { z } from "zod";

export const createContactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    phone: z.string().optional(),
    message: z.string().min(1, "Message is required")
});