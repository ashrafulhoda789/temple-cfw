import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { protectedRoute, requireEditorOrAdmin } from "../middlewares/authMiddleware";
import { 
    createPujaBookingSchema, 
    updateBookingStatusSchema, 
    submitPaymentSchema, 
    schedulePujaSchema 
} from "../validators/pujaBooking.validator";

const pujaBookingRoutes = new Hono();

pujaBookingRoutes.post("/", async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const body = await c.req.json();
        const validation = createPujaBookingSchema.safeParse(body);

        if (!validation.success) {
            return c.json({
                success: false,
                message: "Validation failed",
                errors: validation.error.errors,
            }, 400);
        }

        const data = validation.data;

        const randomNum = Math.floor(10000 + Math.random() * 90000);
        const referenceCode = `GMS-${randomNum}`;

        const newBooking = await db
            .insert(schema.pujaBookings)
            .values({
                referenceCode,
                name: data.name,
                phone: data.phone,
                email: data.email || "",
                gotra: data.gotra,
                preferredDate: data.preferredDate,
                note: data.note || "",
                status: "pending",
                paymentStatus: "unpaid",
            })
            .returning()
            .get();

        return c.json({
            success: true,
            message: "Puja booked successfully!",
            data: {
                id: newBooking.id,
                referenceCode: newBooking.referenceCode,
                name: newBooking.name,
            },
        }, 201);
    } catch (err) {
        console.error("Error creating puja booking:", err);
        return c.json({ success: false, message: "Failed to book puja" }, 500);
    }
});

pujaBookingRoutes.get("/track/:referenceCode", async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const referenceCode = c.req.param("referenceCode");
        const booking = await db
            .select()
            .from(schema.pujaBookings)
            .where(eq(schema.pujaBookings.referenceCode, referenceCode))
            .get();

        if (!booking) {
            return c.json({ success: false, message: "Booking not found with this reference code." }, 404);
        }

        return c.json({ success: true, data: booking });
    } catch (err) {
        console.error("Error tracking booking:", err);
        return c.json({ success: false, message: "Failed to fetch booking details" }, 500);
    }
});

pujaBookingRoutes.post("/:id/payment", async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const body = await c.req.json();
        const validation = submitPaymentSchema.safeParse(body);

        if (!validation.success) {
            return c.json({
                success: false,
                message: "Validation failed",
                errors: validation.error.errors,
            }, 400);
        }

        const existing = await db
            .select()
            .from(schema.pujaBookings)
            .where(eq(schema.pujaBookings.id, id))
            .get();

        if (!existing) {
            return c.json({ success: false, message: "Booking not found" }, 404);
        }

        const { paymentNumber, paymentMethod, transactionId } = validation.data;

        const updatedBooking = await db
            .update(schema.pujaBookings)
            .set({
                paymentNumber,
                paymentMethod,
                transactionId,
                paymentStatus: "submitted",
                updatedAt: new Date().toISOString(),
            })
            .where(eq(schema.pujaBookings.id, id))
            .returning()
            .get();

        return c.json({
            success: true,
            message: "Payment information submitted successfully! Admin will verify and schedule your puja.",
            data: updatedBooking,
        });
    } catch (err) {
        console.error("Error submitting payment:", err);
        return c.json({ success: false, message: "Failed to submit payment information" }, 500);
    }
});

pujaBookingRoutes.get("/admin/all", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const bookings = await db
            .select()
            .from(schema.pujaBookings)
            .orderBy(desc(schema.pujaBookings.createdAt));

        return c.json({ success: true, data: bookings });
    } catch (err) {
        console.error("Error fetching all bookings for admin:", err);
        return c.json({ success: false, message: "Failed to fetch bookings" }, 500);
    }
});

pujaBookingRoutes.patch("/admin/:id/status", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const body = await c.req.json();
        const validation = updateBookingStatusSchema.safeParse(body);

        if (!validation.success) {
            return c.json({
                success: false,
                message: "Validation failed",
                errors: validation.error.errors,
            }, 400);
        }

        const { status, adminNote } = validation.data;

        const existing = await db
            .select()
            .from(schema.pujaBookings)
            .where(eq(schema.pujaBookings.id, id))
            .get();

        if (!existing) {
            return c.json({ success: false, message: "Booking not found" }, 404);
        }

        const updated = await db
            .update(schema.pujaBookings)
            .set({
                status,
                adminNote: adminNote !== undefined ? adminNote : existing.adminNote,
                updatedAt: new Date().toISOString(),
            })
            .where(eq(schema.pujaBookings.id, id))
            .returning()
            .get();

        return c.json({
            success: true,
            message: `Booking status updated to ${status} successfully!`,
            data: updated,
        });
    } catch (err) {
        console.error("Error updating booking status:", err);
        return c.json({ success: false, message: "Failed to update status" }, 500);
    }
});

pujaBookingRoutes.patch("/admin/:id/schedule", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const body = await c.req.json();
        const validation = schedulePujaSchema.safeParse(body);

        if (!validation.success) {
            return c.json({
                success: false,
                message: "Validation failed",
                errors: validation.error.errors,
            }, 400);
        }

        const { scheduledDate, scheduledTime, adminNote } = validation.data;

        const existing = await db
            .select()
            .from(schema.pujaBookings)
            .where(eq(schema.pujaBookings.id, id))
            .get();

        if (!existing) {
            return c.json({ success: false, message: "Booking not found" }, 404);
        }

        const updated = await db
            .update(schema.pujaBookings)
            .set({
                scheduledDate,
                scheduledTime,
                status: "completed", 
                paymentStatus: "verified",
                adminNote: adminNote !== undefined ? adminNote : existing.adminNote,
                updatedAt: new Date().toISOString(),
            })
            .where(eq(schema.pujaBookings.id, id))
            .returning()
            .get();

        return c.json({
            success: true,
            message: "Puja scheduled successfully!",
            data: updated,
        });
    } catch (err) {
        console.error("Error scheduling puja:", err);
        return c.json({ success: false, message: "Failed to schedule puja" }, 500);
    }
});

export default pujaBookingRoutes;