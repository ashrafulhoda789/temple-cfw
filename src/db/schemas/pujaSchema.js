import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const pujas = sqliteTable("pujas", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  title_en: text("title_en").notNull(),
  title_bn: text("title_bn").notNull(),
  description_en: text("description_en").default(""),
  description_bn: text("description_bn").default(""),
  price: real("price").notNull().default(0.0),
  date_en: text("date_en").default(""),
  date_bn: text("date_bn").default(""),
  time: text("time").default(""),
  type_en: text("type_en").default(""),
  type_bn: text("type_bn").default(""),
  location_en: text("location_en").default(""),
  location_bn: text("location_bn").default(""),
  image: text("image").default(""),
  rules_en: text("rules_en").default(""),
  rules_bn: text("rules_bn").default(""),
  isAvailable: integer("is_available", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});
