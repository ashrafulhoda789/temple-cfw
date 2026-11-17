import { z } from 'zod';

export const createContactSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().optional().default(''),
	phone: z
		.string()
		.optional()
		.default('')
		.refine((val) => val === '' || /^[0-9]{11}$/.test(val), {
			message: 'Phone number must be exactly 11 digits',
		}),
	message: z.string().min(1, 'Message is required'),
});

export const replyContactSchema = z.object({
	replyMessage: z.string().min(1, 'Reply message cannot be empty'),
});
