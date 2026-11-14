import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { protectedRoute, requireEditorOrAdmin } from "../middlewares/authMiddleware";
import { 
  createAlbumSchema, 
  updateAlbumSchema, 
  createMediaSchema, 
  updateMediaSchema 
} from "../validators/gallery.validator";

const galleryRoutes = new Hono();

galleryRoutes.get("/albums", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  try {
    const albums = await db.select().from(schema.galleryAlbums).orderBy(desc(schema.galleryAlbums.createdAt));
    return c.json({ success: true, data: albums });
  } catch (err) {
    console.error("Error fetching albums:", err);
    return c.json({ success: false, message: "Failed to fetch albums" }, 500);
  }
});

galleryRoutes.post("/albums", protectedRoute, requireEditorOrAdmin, async (c) => {
  const db = drizzle(c.env.DB, { schema });
  try {
    const body = await c.req.json();
    const validation = createAlbumSchema.safeParse(body);
    if (!validation.success) {
      return c.json({ success: false, message: "Validation failed", errors: validation.error.errors }, 400);
    }

    const newAlbum = await db.insert(schema.galleryAlbums).values(validation.data).returning().get();
    return c.json({ success: true, message: "Album created successfully", data: newAlbum }, 201);
  } catch (err) {
    console.error("Error creating album:", err);
    return c.json({ success: false, message: "Failed to create album" }, 500);
  }
});


galleryRoutes.delete("/albums/:id", protectedRoute, requireEditorOrAdmin, async (c) => {
  const db = drizzle(c.env.DB, { schema });
  try {
    const id = c.req.param("id");
    const existing = await db.select().from(schema.galleryAlbums).where(eq(schema.galleryAlbums.id, id)).get();
    if (!existing) return c.json({ success: false, message: "Album not found" }, 404);

    await db.delete(schema.galleryAlbums).where(eq(schema.galleryAlbums.id, id));
    return c.json({ success: true, message: "Album deleted successfully" });
  } catch (err) {
    console.error("Error deleting album:", err);
    return c.json({ success: false, message: "Failed to delete album" }, 500);
  }
});

galleryRoutes.get("/media", async (c) => {
  const db = drizzle(c.env.DB, { schema });
  try {
    const type = c.req.query("type");
    const albumId = c.req.query("albumId");

    let query = db.select().from(schema.galleryMedia);
    
    const mediaList = await query.orderBy(desc(schema.galleryMedia.createdAt));
    
    const filtered = mediaList.filter(item => {
      if (type && item.mediaType !== type) return false;
      if (albumId && item.albumId !== albumId) return false;
      return true;
    });

    return c.json({ success: true, data: filtered });
  } catch (err) {
    console.error("Error fetching media:", err);
    return c.json({ success: false, message: "Failed to fetch media" }, 500);
  }
});

galleryRoutes.post("/media", protectedRoute, requireEditorOrAdmin, async (c) => {
  const db = drizzle(c.env.DB, { schema });
  try {
    const body = await c.req.json();
    const validation = createMediaSchema.safeParse(body);
    if (!validation.success) {
      return c.json({ success: false, message: "Validation failed", errors: validation.error.errors }, 400);
    }

    const data = validation.data;

    if (data.mediaType === "video" && data.isFeaturedVideo) {
      await db.update(schema.galleryMedia)
        .set({ isFeaturedVideo: false })
        .where(eq(schema.galleryMedia.mediaType, "video"));
    }

    const newMedia = await db.insert(schema.galleryMedia).values(data).returning().get();
    return c.json({ success: true, message: "Media uploaded successfully", data: newMedia }, 201);
  } catch (err) {
    console.error("Error uploading media:", err);
    return c.json({ success: false, message: "Failed to upload media" }, 500);
  }
});

galleryRoutes.put("/media/:id", protectedRoute, requireEditorOrAdmin, async (c) => {
  const db = drizzle(c.env.DB, { schema });
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const validation = updateMediaSchema.safeParse(body);
    if (!validation.success) {
      return c.json({ success: false, message: "Validation failed", errors: validation.error.errors }, 400);
    }

    const existing = await db.select().from(schema.galleryMedia).where(eq(schema.galleryMedia.id, id)).get();
    if (!existing) return c.json({ success: false, message: "Media not found" }, 404);

    const data = validation.data;

    if (data.mediaType === "video" && data.isFeaturedVideo) {
      await db.update(schema.galleryMedia)
        .set({ isFeaturedVideo: false })
        .where(eq(schema.galleryMedia.mediaType, "video"));
    }

    const updatedMedia = await db.update(schema.galleryMedia)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(schema.galleryMedia.id, id))
      .returning()
      .get();

    return c.json({ success: true, message: "Media updated successfully", data: updatedMedia });
  } catch (err) {
    console.error("Error updating media:", err);
    return c.json({ success: false, message: "Failed to update media" }, 500);
  }
});

galleryRoutes.delete("/media/:id", protectedRoute, requireEditorOrAdmin, async (c) => {
  const db = drizzle(c.env.DB, { schema });
  try {
    const id = c.req.param("id");
    const existing = await db.select().from(schema.galleryMedia).where(eq(schema.galleryMedia.id, id)).get();
    if (!existing) return c.json({ success: false, message: "Media not found" }, 404);

    await db.delete(schema.galleryMedia).where(eq(schema.galleryMedia.id, id));
    return c.json({ success: true, message: "Media deleted successfully" });
  } catch (err) {
    console.error("Error deleting media:", err);
    return c.json({ success: false, message: "Failed to delete media" }, 500);
  }
});

export default galleryRoutes;