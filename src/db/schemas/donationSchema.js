import { sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const donations = sqliteTable("donations", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull().default("Anonymous"),
    phone: text("phone").notNull(),
    amount: real("amount").notNull(),
    paymentMethod: text("payment_method").notNull(),
    transactionId: text("transaction_id").notNull(),
    status: text("status").notNull().default("pending"),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});