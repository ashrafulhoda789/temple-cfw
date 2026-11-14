import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const events = sqliteTable("events", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    titleEn: text("title_en").notNull(),
    titleBn: text("title_bn").notNull(),
    categoryEn: text("category_en").default(""),
    categoryBn: text("category_bn").default(""),
    descriptionEn: text("description_en").default(""),
    descriptionBn: text("description_bn").default(""),
    coverImage: text("cover_image").default(""),
    eventDateTime: text("event_date_time").notNull(), 
    locationEn: text("location_en").default(""),
    locationBn: text("location_bn").default(""),
    organizerEn: text("organizer_en").default(""),
    organizerBn: text("organizer_bn").default(""),
    isRegistrationRequired: integer("is_registration_required", { mode: "boolean" }).notNull().default(false),
    registrationDeadline: text("registration_deadline").default(""),
    eventStatus: text("event_status").notNull().default("Upcoming"), 
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});

export const eventSchedules = sqliteTable("event_schedules", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    eventId: text("event_id").notNull(),
    dayLabelEn: text("day_label_en").notNull(),
    dayLabelBn: text("day_label_bn").notNull(),
    scheduleDate: text("schedule_date").notNull(),
    dayTitleEn: text("day_title_en").default(""),
    dayTitleBn: text("day_title_bn").default(""),
    activities: text("activities").default("[]"),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});