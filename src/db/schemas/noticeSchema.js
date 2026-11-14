import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const notices = sqliteTable("notices", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title_en: text("title_en").notNull(),
  title_bn: text("title_bn").notNull(),
  category_en: text("category_en").default("General"),
  category_bn: text("category_bn").default("সাধারণ"),
  description_en: text("description_en").notNull(),
  description_bn: text("description_bn").notNull(),
  attachmentUrl: text("attachment_url").default(""),
  publishDate: text("publish_date").notNull(),
  expiryDate: text("expiry_date").default(""),
  isPinned: integer("is_pinned", { mode: "boolean" }).notNull().default(false),
  status: text("status").notNull().default("Published"), // Published / Draft / Archived
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});