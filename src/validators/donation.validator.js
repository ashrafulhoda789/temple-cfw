import { z } from "zod";

export const createDonationSchema = z.object({
    name: z.string().optional().default("Anonymous"),
    phone: z.string().min(1, "Phone number is required"),
    amount: z.coerce.number().positive("Amount must be greater than 0"),
    paymentMethod: z.enum(["bkash", "nagad", "bank_transfer"], {
        errorMap: () => ({ message: "Please select a valid payment method" }),
    }),
    transactionId: z.string().min(1, "Transaction ID is required"),
});

export const updateDonationStatusSchema = z.object({
    status: z.enum(["pending", "verified", "rejected"], {
        errorMap: () => ({ message: "Invalid status value" }),
    }),
});