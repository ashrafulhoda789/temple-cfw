import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { protectedRoute, requireEditorOrAdmin } from "../middlewares/authMiddleware";
import { createNoticeSchema, updateNoticeSchema } from "../validators/notice.validator";

const noticeRoutes = new Hono();

noticeRoutes.get("/", async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const allNotices = await db
            .select()
            .from(schema.notices)
            .orderBy(desc(schema.notices.isPinned), desc(schema.notices.createdAt));
        return c.json({ success: true, data: allNotices });
    } catch (err) {
        console.error("Error fetching notices:", err);
        return c.json({ success: false, message: "Failed to fetch notices" }, 500);
    }
});

noticeRoutes.get("/:id", async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const notice = await db.select().from(schema.notices).where(eq(schema.notices.id, id)).get();

        if (!notice) {
            return c.json({ success: false, message: "Notice not found" }, 404);
        }

        return c.json({ success: true, data: notice });
    } catch (err) {
        console.error("Error fetching notice details:", err);
        return c.json({ success: false, message: "Error fetching notice details" }, 500);
    }
});

noticeRoutes.post("/", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const body = await c.req.json();
        const validation = createNoticeSchema.safeParse(body);

        if (!validation.success) {
            return c.json({
                success: false,
                message: "Validation failed",
                errors: validation.error.errors
            }, 400);
        }

        const newNotice = await db.insert(schema.notices).values(validation.data).returning().get();

        return c.json({
            success: true,
            message: "Notice published successfully!",
            data: newNotice
        }, 201);
    } catch (err) {
        console.error("Error creating notice:", err);
        return c.json({ success: false, message: "Failed to create notice" }, 500);
    }
});

noticeRoutes.put("/:id", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const body = await c.req.json();
        const validation = updateNoticeSchema.safeParse(body);

        if (!validation.success) {
            return c.json({
                success: false,
                message: "Validation failed",
                errors: validation.error.errors
            }, 400);
        }

        const existing = await db.select().from(schema.notices).where(eq(schema.notices.id, id)).get();

        if (!existing) {
            return c.json({ success: false, message: "Notice not found" }, 404);
        }

        const updatedNotice = await db.update(schema.notices)
            .set({
                ...validation.data,
                updatedAt: new Date().toISOString()
            })
            .where(eq(schema.notices.id, id))
            .returning()
            .get();

        return c.json({
            success: true,
            message: "Notice updated successfully!",
            data: updatedNotice
        });
    } catch (err) {
        console.error("Error updating notice:", err);
        return c.json({ success: false, message: "Failed to update notice" }, 500);
    }
});

// Toggle pin status
noticeRoutes.patch("/:id/pin", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const { isPinned } = await c.req.json();

        if (typeof isPinned !== "boolean") {
            return c.json({ success: false, message: "isPinned must be a boolean" }, 400);
        }

        const updatedNotice = await db.update(schema.notices)
            .set({
                isPinned,
                updatedAt: new Date().toISOString()
            })
            .where(eq(schema.notices.id, id))
            .returning()
            .get();

        return c.json({
            success: true,
            message: "Notice pin status updated",
            data: updatedNotice
        });
    } catch (err) {
        console.error("Error updating pin status:", err);
        return c.json({ success: false, message: "Failed to update pin status" }, 500);
    }
});

noticeRoutes.delete("/:id", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const existing = await db.select().from(schema.notices).where(eq(schema.notices.id, id)).get();

        if (!existing) {
            return c.json({ success: false, message: "Notice not found" }, 404);
        }

        await db.delete(schema.notices).where(eq(schema.notices.id, id));

        return c.json({
            success: true,
            message: "Notice deleted successfully!"
        });
    } catch (err) {
        console.error("Error deleting notice:", err);
        return c.json({ success: false, message: "Failed to delete notice" }, 500);
    }
});

export default noticeRoutes;