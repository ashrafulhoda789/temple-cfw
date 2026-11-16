import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { protectedRoute, requireEditorOrAdmin } from "../middlewares/authMiddleware";
import { createDonationSchema, updateDonationStatusSchema } from "../validators/donation.validator";

const donationRoutes = new Hono();

donationRoutes.get("/", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const allDonations = await db
            .select()
            .from(schema.donations)
            .orderBy(desc(schema.donations.createdAt));

        return c.json({ success: true, data: allDonations });
    } catch (err) {
        console.error("Error fetching donations:", err);
        return c.json({ success: false, message: "Failed to fetch donations" }, 500);
    }
});

donationRoutes.post("/", async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const body = await c.req.json();
        const validation = createDonationSchema.safeParse(body);

        if (!validation.success) {
            return c.json({
                success: false,
                message: "Validation failed",
                errors: validation.error.errors,
            }, 400);
        }

        const { name, phone, amount, paymentMethod, transactionId } = validation.data;
        const cleanTrxId = transactionId.trim();

        const existingTrx = await db
            .select()
            .from(schema.donations)
            .where(eq(schema.donations.transactionId, cleanTrxId))
            .get();

        if (existingTrx) {
            return c.json({
                success: false,
                message: "This Transaction ID has already been submitted.",
            }, 409);
        }

        const newDonation = await db
            .insert(schema.donations)
            .values({
                name: name && name.trim() ? name.trim() : "Anonymous",
                phone: phone.trim(),
                amount,
                paymentMethod,
                transactionId: cleanTrxId,
            })
            .returning()
            .get();

        return c.json({
            success: true,
            message: "Donation submitted successfully! Thank you for your contribution.",
            data: newDonation,
        }, 201);
    } catch (err) {
        console.error("Error submitting donation:", err);
        return c.json({ success: false, message: "Failed to submit donation" }, 500);
    }
});

donationRoutes.put("/:id/status", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const body = await c.req.json();
        const validation = updateDonationStatusSchema.safeParse(body);

        if (!validation.success) {
            return c.json({
                success: false,
                message: "Validation failed",
                errors: validation.error.errors,
            }, 400);
        }

        const existing = await db
            .select()
            .from(schema.donations)
            .where(eq(schema.donations.id, id))
            .get();

        if (!existing) {
            return c.json({ success: false, message: "Donation record not found" }, 404);
        }

        const updatedDonation = await db
            .update(schema.donations)
            .set({
                status: validation.data.status,
                updatedAt: new Date().toISOString(),
            })
            .where(eq(schema.donations.id, id))
            .returning()
            .get();

        return c.json({
            success: true,
            message: `Donation marked as ${validation.data.status}!`,
            data: updatedDonation,
        });
    } catch (err) {
        console.error("Error updating donation status:", err);
        return c.json({ success: false, message: "Failed to update donation status" }, 500);
    }
});

donationRoutes.delete("/:id", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const existing = await db
            .select()
            .from(schema.donations)
            .where(eq(schema.donations.id, id))
            .get();

        if (!existing) {
            return c.json({ success: false, message: "Donation record not found" }, 404);
        }

        await db.delete(schema.donations).where(eq(schema.donations.id, id));

        return c.json({
            success: true,
            message: "Donation record deleted successfully!",
        });
    } catch (err) {
        console.error("Error deleting donation:", err);
        return c.json({ success: false, message: "Failed to delete donation record" }, 500);
    }
});

export default donationRoutes;