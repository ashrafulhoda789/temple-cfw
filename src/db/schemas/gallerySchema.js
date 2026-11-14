import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const galleryAlbums = sqliteTable("gallery_albums", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  titleEn: text("title_en").notNull(),
  titleBn: text("title_bn").notNull(),
  descriptionEn: text("description_en").default(""),
  descriptionBn: text("description_bn").default(""),
  coverImage: text("cover_image").default(""),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const galleryMedia = sqliteTable("gallery_media", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  albumId: text("album_id"),
  titleEn: text("title_en").default(""),
  titleBn: text("title_bn").default(""),
  captionEn: text("caption_en").default(""),
  captionBn: text("caption_bn").default(""),
  mediaUrl: text("media_url").notNull(),
  mediaType: text("media_type").notNull().default("image"), // 'image' or 'video'
  isFeaturedVideo: integer("is_featured_video", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});