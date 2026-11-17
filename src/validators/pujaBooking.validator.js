import { z } from "zod";

export const createPujaBookingSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    gotra: z.string().min(1, "Gotra is required"),
    preferredDate: z.string().min(1, "Preferred date is required"),
    note: z.string().optional().default(""),
});

export const updateBookingStatusSchema = z.object({
    status: z.enum(["pending", "reviewed", "accepted", "confirmed", "rejected", "completed"]),
    adminNote: z.string().optional().default(""),
});

export const submitPaymentSchema = z.object({
    paymentNumber: z.string().min(1, "Payment number is required"),
    paymentMethod: z.string().min(1, "Payment method is required"),
    transactionId: z.string().min(1, "Transaction ID is required"),
});

export const schedulePujaSchema = z.object({
    scheduledDate: z.string().min(1, "Scheduled date is required"),
    scheduledTime: z.string().min(1, "Scheduled time is required"),
    adminNote: z.string().optional().default(""),
});