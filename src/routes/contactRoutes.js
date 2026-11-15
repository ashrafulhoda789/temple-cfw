import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { protectedRoute, requireEditorOrAdmin } from "../middlewares/authMiddleware";
import { createContactSchema } from "../validators/contact.validator";

const contactRoutes = new Hono();

contactRoutes.get("/", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const allContacts = await db
            .select()
            .from(schema.contacts)
            .orderBy(desc(schema.contacts.createdAt));
            
        return c.json({ success: true, data: allContacts });
    } catch (err) {
        console.error("Error fetching contact messages:", err);
        return c.json({ success: false, message: "Failed to fetch contact messages" }, 500);
    }
});

contactRoutes.post("/", async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const body = await c.req.json();
        const validation = createContactSchema.safeParse(body);

        if (!validation.success) {
            return c.json({
                success: false,
                message: "Validation failed",
                errors: validation.error.errors
            }, 400);
        }

        const { name, email, phone, message } = validation.data;

        const newContact = await db.insert(schema.contacts).values({
            name,
            email: email || "",
            phone: phone || "",
            message
        }).returning().get();

        return c.json({
            success: true,
            message: "Message sent successfully!",
            data: newContact
        }, 201);
    } catch (err) {
        console.error("Error creating contact message:", err);
        return c.json({ success: false, message: "Failed to send message" }, 500);
    }
});

contactRoutes.delete("/:id", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const id = c.req.param("id");
        const existing = await db.select().from(schema.contacts).where(eq(schema.contacts.id, id)).get();

        if (!existing) {
            return c.json({ success: false, message: "Contact message not found" }, 404);
        }

        await db.delete(schema.contacts).where(eq(schema.contacts.id, id));

        return c.json({
            success: true,
            message: "Contact message deleted successfully!"
        });
    } catch (err) {
        console.error("Error deleting contact message:", err);
        return c.json({ success: false, message: "Failed to delete contact message" }, 500);
    }
});

export default contactRoutes;