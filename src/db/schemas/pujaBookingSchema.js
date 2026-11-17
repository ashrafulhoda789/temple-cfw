import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const pujaBookings = sqliteTable("puja_bookings", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    referenceCode: text("reference_code").notNull().unique(), 
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    email: text("email").default(""),
    gotra: text("gotra").notNull(),
    preferredDate: text("preferred_date").notNull(),
    note: text("note").default(""),
    
    // Status flow: 'pending', 'reviewed', 'accepted', 'confirmed', 'rejected', 'completed'
    status: text("status").notNull().default("pending"), 

    paymentNumber: text("payment_number").default(""),
    paymentMethod: text("payment_method").default(""), 
    transactionId: text("transaction_id").default(""),
    paymentStatus: text("payment_status").notNull().default("unpaid"), 

    scheduledDate: text("scheduled_date").default(""),
    scheduledTime: text("scheduled_time").default(""),
    adminNote: text("admin_note").default(""),

    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});