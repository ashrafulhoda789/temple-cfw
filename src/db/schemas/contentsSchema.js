import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const page_contents = sqliteTable("page_contents", {
  id: text("id").primaryKey(),
  hero: text("hero", { mode: "json" }).notNull(),
  arthiSchedule: text("arthi_schedule", { mode: "json" }).notNull(),
  about: text("about", { mode: "json" }).notNull(),
  history: text("history", { mode: "json" }).notNull(),
  deities: text("deities", { mode: "json" }).notNull(),
  templeTimings: text("temple_timings", { mode: "json" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});