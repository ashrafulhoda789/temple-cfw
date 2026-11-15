import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const contacts = sqliteTable("contacts", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    email: text("email").default(""), 
    phone: text("phone").default(""),
    message: text("message").notNull(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`)
});