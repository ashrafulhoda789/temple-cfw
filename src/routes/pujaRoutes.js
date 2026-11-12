import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { protectedRoute, requireEditorOrAdmin } from "../middlewares/authMiddleware";
import { createPujaSchema, updatePujaSchema } from "../validators/puja.validator";


const pujaRoutes = new Hono();

pujaRoutes.get("/", async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const allPujas = await db.select().from(schema.pujas).orderBy(desc(schema.pujas.createdAt));
        return c.json({ success: true, data: allPujas });
    } catch (err) {
        console.error("Error fetching pujas:", err);
        return c.json({ success: false, message: "Failed to fetch pujas" }, 500);
    }
});


pujaRoutes.get("/:id", async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const puja = await db.select().from(schema.pujas).where(eq(schema.pujas.id, id)).get();

        if (!puja) {
            return c.json({ success: false, message: "Puja not found" }, 404);
        }

        return c.json({ success: true, data: puja });
    } catch (err) {
        return c.json({ success: false, message: "Error fetching puja details" }, 500);
    }
});

pujaRoutes.post("/", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const body = await c.req.json();
        const validation = createPujaSchema.safeParse(body);

        if (!validation.success) {
            return c.json({
                success: false,
                message: "Validation failed",
                errors: validation.error.errors
            }, 400);
        }

        const newPuja = await db.insert(schema.pujas).values(validation.data).returning().get();

        return c.json({
            success: true,
            message: "Puja created successfully!",
            data: newPuja
        }, 201);
    } catch (err) {
        console.error("Error creating puja:", err);
        return c.json({ success: false, message: "Failed to create puja" }, 500);
    }
});

pujaRoutes.put("/:id", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const body = await c.req.json();
        const validation = updatePujaSchema.safeParse(body);

        if (!validation.success) {
            return c.json({
                success: false,
                message: "Validation failed",
                errors: validation.error.errors
            }, 400);
        }

        const existing = await db.select().from(schema.pujas).where(eq(schema.pujas.id, id)).get();

        if (!existing) {
            return c.json({ success: false, message: "Puja not found" }, 404);
        }

        const updatedPuja = await db.update(schema.pujas)
            .set({
                ...validation.data,
                updatedAt: new Date().toISOString()
            })
            .where(eq(schema.pujas.id, id))
            .returning()
            .get();

        return c.json({
            success: true,
            message: "Puja updated successfully!",
            data: updatedPuja
        });
    } catch (err) {
        console.error("Error updating puja:", err);
        return c.json({ success: false, message: "Failed to update puja" }, 500);
    }
});

pujaRoutes.patch("/:id/status", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const { isAvailable } = await c.req.json();

        if (typeof isAvailable !== "boolean") {
            return c.json({ success: false, message: "isAvailable must be a boolean" }, 400);
        }

        const updatedPuja = await db.update(schema.pujas)
            .set({
                isAvailable,
                updatedAt: new Date().toISOString()
            })
            .where(eq(schema.pujas.id, id))
            .returning()
            .get();

        return c.json({
            success: true,
            message: "Status updated successfully",
            data: updatedPuja
        });
    } catch (err) {
        return c.json({ success: false, message: "Failed to update status" }, 500);
    }
});


pujaRoutes.delete("/:id", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const existing = await db.select().from(schema.pujas).where(eq(schema.pujas.id, id)).get();

        if (!existing) {
            return c.json({ success: false, message: "Puja not found" }, 404);
        }

        await db.delete(schema.pujas).where(eq(schema.pujas.id, id));

        return c.json({
            success: true,
            message: "Message deleted successfully!"
        });
    } catch (err) {
        console.error("Error deleting puja:", err);
        return c.json({ success: false, message: "Failed to delete puja" }, 500);
    }
});

export default pujaRoutes;