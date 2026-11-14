import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const committeeMembers = sqliteTable("committee_members", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  nameEn: text("name_en").notNull(),
  nameBn: text("name_bn").notNull(),
  positionEn: text("position_en").notNull(),
  positionBn: text("position_bn").notNull(),
  photoUrl: text("photo_url").default(""),
  phone: text("phone").default(""),
  email: text("email").default(""),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});