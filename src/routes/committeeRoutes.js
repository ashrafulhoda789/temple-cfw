import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";
import { eq, asc } from "drizzle-orm";
import { protectedRoute, requireEditorOrAdmin } from "../middlewares/authMiddleware";
import { createCommitteeSchema, updateCommitteeSchema } from "../validators/committee.validator";

const committeeRoutes = new Hono();

committeeRoutes.get("/", async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const members = await db
            .select()
            .from(schema.committeeMembers)
            .orderBy(asc(schema.committeeMembers.displayOrder));
        return c.json({ success: true, data: members });
    } catch (err) {
        console.error("Error fetching committee members:", err);
        return c.json({ success: false, message: "Failed to fetch committee members" }, 500);
    }
});

committeeRoutes.get("/:id", async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const member = await db
            .select()
            .from(schema.committeeMembers)
            .where(eq(schema.committeeMembers.id, id))
            .get();

        if (!member) {
            return c.json({ success: false, message: "Member not found" }, 404);
        }

        return c.json({ success: true, data: member });
    } catch (err) {
        console.error("Error fetching member details:", err);
        return c.json({ success: false, message: "Error fetching member details" }, 500);
    }
});


committeeRoutes.post("/", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const body = await c.req.json();
        const validation = createCommitteeSchema.safeParse(body);

        if (!validation.success) {
            return c.json({
                success: false,
                message: "Validation failed",
                errors: validation.error.errors,
            }, 400);
        }

        const newMember = await db
            .insert(schema.committeeMembers)
            .values(validation.data)
            .returning()
            .get();

        return c.json({
            success: true,
            message: "Committee member added successfully!",
            data: newMember,
        }, 201);
    } catch (err) {
        console.error("Error creating committee member:", err);
        return c.json({ success: false, message: "Failed to add committee member" }, 500);
    }
});

committeeRoutes.put("/:id", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const body = await c.req.json();
        const validation = updateCommitteeSchema.safeParse(body);

        if (!validation.success) {
            return c.json({
                success: false,
                message: "Validation failed",
                errors: validation.error.errors,
            }, 400);
        }

        const existing = await db
            .select()
            .from(schema.committeeMembers)
            .where(eq(schema.committeeMembers.id, id))
            .get();

        if (!existing) {
            return c.json({ success: false, message: "Member not found" }, 404);
        }

        const updatedMember = await db
            .update(schema.committeeMembers)
            .set({
                ...validation.data,
                updatedAt: new Date().toISOString(),
            })
            .where(eq(schema.committeeMembers.id, id))
            .returning()
            .get();

        return c.json({
            success: true,
            message: "Committee member updated successfully!",
            data: updatedMember,
        });
    } catch (err) {
        console.error("Error updating committee member:", err);
        return c.json({ success: false, message: "Failed to update committee member" }, 500);
    }
});


committeeRoutes.delete("/:id", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const existing = await db
            .select()
            .from(schema.committeeMembers)
            .where(eq(schema.committeeMembers.id, id))
            .get();

        if (!existing) {
            return c.json({ success: false, message: "Member not found" }, 404);
        }

        await db.delete(schema.committeeMembers).where(eq(schema.committeeMembers.id, id));

        return c.json({
            success: true,
            message: "Committee member deleted successfully!",
        });
    } catch (err) {
        console.error("Error deleting committee member:", err);
        return c.json({ success: false, message: "Failed to delete committee member" }, 500);
    }
});

export default committeeRoutes;