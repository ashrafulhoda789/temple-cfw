import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { protectedRoute, requireEditorOrAdmin } from "../middlewares/authMiddleware";
import { createEventSchema, updateEventSchema } from "../validators/event.validator";

const eventRoutes = new Hono();

eventRoutes.get("/", async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const allEvents = await db
            .select()
            .from(schema.events)
            .orderBy(desc(schema.events.eventDateTime));

        // Fetch schedules for each event and parse activities JSON
        const eventsWithSchedules = await Promise.all(
            allEvents.map(async (event) => {
                const rawSchedules = await db
                    .select()
                    .from(schema.eventSchedules)
                    .where(eq(schema.eventSchedules.eventId, event.id));

                const schedules = rawSchedules.map(sch => ({
                    ...sch,
                    activities: sch.activities ? JSON.parse(sch.activities) : []
                }));

                return { ...event, schedules };
            })
        );

        return c.json({ success: true, data: eventsWithSchedules });
    } catch (err) {
        console.error("Error fetching events:", err);
        return c.json({ success: false, message: "Failed to fetch events" }, 500);
    }
});

eventRoutes.get("/:id", async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const event = await db
            .select()
            .from(schema.events)
            .where(eq(schema.events.id, id))
            .get();

        if (!event) {
            return c.json({ success: false, message: "Event not found" }, 404);
        }

        const rawSchedules = await db
            .select()
            .from(schema.eventSchedules)
            .where(eq(schema.eventSchedules.eventId, event.id));

        const schedules = rawSchedules.map(sch => ({
            ...sch,
            activities: sch.activities ? JSON.parse(sch.activities) : []
        }));

        return c.json({ success: true, data: { ...event, schedules } });
    } catch (err) {
        console.error("Error fetching event details:", err);
        return c.json({ success: false, message: "Error fetching event details" }, 500);
    }
});

eventRoutes.post("/", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const body = await c.req.json();
        const validation = createEventSchema.safeParse(body);

        if (!validation.success) {
            return c.json({
                success: false,
                message: "Validation failed",
                errors: validation.error.errors,
            }, 400);
        }

        const { schedules, ...eventData } = validation.data;

        // Insert main event
        const newEvent = await db
            .insert(schema.events)
            .values(eventData)
            .returning()
            .get();

        // Insert schedules if provided
        const insertedSchedules = [];
        if (schedules && schedules.length > 0) {
            for (const schedule of schedules) {
                const newSchedule = await db
                    .insert(schema.eventSchedules)
                    .values({
                        eventId: newEvent.id,
                        dayLabelEn: schedule.day_label_en,
                        dayLabelBn: schedule.day_label_bn,
                        scheduleDate: schedule.schedule_date,
                        dayTitleEn: schedule.day_title_en || "",
                        dayTitleBn: schedule.day_title_bn || "",
                        activities: JSON.stringify(schedule.activities || []),
                    })
                    .returning()
                    .get();

                insertedSchedules.push({
                    ...newSchedule,
                    activities: schedule.activities || []
                });
            }
        }

        return c.json({
            success: true,
            message: "Event published successfully!",
            data: { ...newEvent, schedules: insertedSchedules },
        }, 201);
    } catch (err) {
        console.error("Error creating event:", err);
        return c.json({ success: false, message: "Failed to create event" }, 500);
    }
});

eventRoutes.put("/:id", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const body = await c.req.json();
        const validation = updateEventSchema.safeParse(body);

        if (!validation.success) {
            return c.json({
                success: false,
                message: "Validation failed",
                errors: validation.error.errors,
            }, 400);
        }

        const existing = await db
            .select()
            .from(schema.events)
            .where(eq(schema.events.id, id))
            .get();

        if (!existing) {
            return c.json({ success: false, message: "Event not found" }, 404);
        }

        const { schedules, ...eventData } = validation.data;

        // Update main event
        const updatedEvent = await db
            .update(schema.events)
            .set({
                ...eventData,
                updatedAt: new Date().toISOString(),
            })
            .where(eq(schema.events.id, id))
            .returning()
            .get();

        // If schedules are provided, replace old schedules with new ones
        if (schedules) {
            await db
                .delete(schema.eventSchedules)
                .where(eq(schema.eventSchedules.eventId, id));

            for (const schedule of schedules) {
                await db.insert(schema.eventSchedules).values({
                    eventId: id,
                    dayLabelEn: schedule.day_label_en,
                    dayLabelBn: schedule.day_label_bn,
                    scheduleDate: schedule.schedule_date,
                    dayTitleEn: schedule.day_title_en || "",
                    dayTitleBn: schedule.day_title_bn || "",
                    activities: JSON.stringify(schedule.activities || []),
                });
            }
        }

        const rawFinalSchedules = await db
            .select()
            .from(schema.eventSchedules)
            .where(eq(schema.eventSchedules.eventId, id));

        const finalSchedules = rawFinalSchedules.map(sch => ({
            ...sch,
            activities: sch.activities ? JSON.parse(sch.activities) : []
        }));

        return c.json({
            success: true,
            message: "Event updated successfully!",
            data: { ...updatedEvent, schedules: finalSchedules },
        });
    } catch (err) {
        console.error("Error updating event:", err);
        return c.json({ success: false, message: "Failed to update event" }, 500);
    }
});

eventRoutes.delete("/:id", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const existing = await db
            .select()
            .from(schema.events)
            .where(eq(schema.events.id, id))
            .get();

        if (!existing) {
            return c.json({ success: false, message: "Event not found" }, 404);
        }

        await db.delete(schema.events).where(eq(schema.events.id, id));

        return c.json({
            success: true,
            message: "Event deleted successfully!",
        });
    } catch (err) {
        console.error("Error deleting event:", err);
        return c.json({ success: false, message: "Failed to delete event" }, 500);
    }
});

export default eventRoutes;