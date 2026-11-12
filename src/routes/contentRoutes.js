import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
import { protectedRoute, requireEditorOrAdmin } from "../middlewares/authMiddleware";
import { updateContentSchema } from "../validators/content.validator";


const contentRoutes = new Hono();

contentRoutes.get("/", async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        let contents = await db.select().from(schema.page_contents).where(eq(schema.page_contents.id, "global_settings")).get();

        if (!contents) {
            return c.json({
                success: true,
                data: {
                    hero: {
                        title_en: "Golpahar Mohashoshan Kali Mandir",
                        title_bn: "গোলপাহাড় মহাশ্মশান কালী মন্দির",
                        description_en: "A place of prayer, peace and community. Dedicated to divine worship, spiritual awakening, and selfless social welfare in Chittagong.",
                        description_bn: "প্রার্থনা, শান্তি এবং সম্প্রদায়ের একটি পবিত্র স্থান। চটগ্রামে দিব্য পূজা, আধ্যাত্মিক জাগরণ এবং নিঃস্বার্থ সমাজকল্যাণে নিবেদিত।",
                        "images": [
                            {
                                "url": "https://i.ibb.co.com/tw9CgxkX/temple1.jpg",
                                "caption_en": "Golpahar Mohashoshan Kali Mandir",
                                "caption_bn": "গোলপাহাড় মহাশ্মশান কালী মন্দির"
                            },
                            {
                                "url": "https://i.ibb.co.com/nMC51Pmn/temple2.webp",
                                "caption_en": "Evening Aarti",
                                "caption_bn": "সন্ধ্যা আরতি"
                            },
                            {
                                url: "https://i.ibb.co.com/ZpDhhp2K/temple3.webp",
                                caption_en: "Temple View",
                                caption_bn: "মন্দির প্রাঙ্গণ"
                            }
                        ]
                    },
                    arthiSchedule: [
                        {
                            title_en: "Mangal Aarti",
                            title_bn: "মঙ্গলারতি",
                            description_en: "Early morning awakening prayers.",
                            description_bn: "ভোরবেলার আরতি ও প্রার্থনা।",
                            time: "04:00 AM",
                            start: "",
                            end: ""
                        },
                        {
                            title_en: "Bhog Offering",
                            title_bn: "ভোগ নিবেদন",
                            description_en: "Mahaprabhune bhog dhruvavani vidhi.",
                            description_bn: "মহাপ্রভুর ভোগ ও ধ্রুববাণী বিধি।",
                            time: "12:30 PM",
                            start: "",
                            end: ""
                        },
                        {
                            title_en: "Sandhya Aarti",
                            title_bn: "সন্ধ্যা আরতি",
                            description_en: "Sanjni divya aarti ane mahapuja.",
                            description_bn: "সন্ধ্যাবেলার দিব্য আরতি ও মহাপূজা।",
                            time: "6:30 PM",
                            start: "",
                            end: ""
                        },
                        {
                            title_en: "Shital Bhog & Shayan",
                            title_bn: "শীতল ভোগ ও শয়ন",
                            description_en: "Ratrina samaye shital bhog ane shayan darshan.",
                            description_bn: "রাত্রিকালীন শীতল ভোগ ও শয়ন দর্শন।",
                            time: "8:00 PM",
                            start: "",
                            end: ""
                        }
                    ],
                    about: {
                        introduction: "",
                        committeeOverview: "",
                        members: [],
                        messages: []
                    },
                    history: {
                        templeHistory: "",
                        mohashoshanHistory: ""
                    },
                    deities: [],
                    templeTimings: {
                        openingTime: "05:00 AM",
                        closingTime: "09:00 PM",
                        status: "Open"
                    }
                }
            });
        }

        return c.json({
            success: true,
            data: contents
        }, 200, {
            "Cache-Control": "public, max-age=300, stale-while-revalidate=600"
        });

    } catch (err) {
        console.error("Error fetching contents:", err);
        return c.json({ success: false, message: "Internal Server Error" }, 500);
    }
});

contentRoutes.put("/", protectedRoute, requireEditorOrAdmin, async (c) => {
    const db = drizzle(c.env.DB, { schema });
    try {
        const body = await c.req.json();

        const validationResult = updateContentSchema.safeParse(body);
        if (!validationResult.success) {
            return c.json({
                success: false,
                message: "Validation failed",
                errors: validationResult.error.errors
            }, 400);
        }

        const { hero, arthiSchedule, about, history, deities, templeTimings } = validationResult.data;

        const existing = await db.select().from(schema.page_contents).where(eq(schema.page_contents.id, "global_settings")).get();
        const now = new Date();

        if (existing) {
            await db.update(schema.page_contents)
                .set({
                    hero: hero !== undefined ? hero : existing.hero,
                    arthiSchedule: arthiSchedule !== undefined ? arthiSchedule : existing.arthiSchedule,
                    about: about !== undefined ? about : existing.about,
                    history: history !== undefined ? history : existing.history,
                    deities: deities !== undefined ? deities : existing.deities,
                    templeTimings: templeTimings !== undefined ? templeTimings : existing.templeTimings,
                    updatedAt: now,
                })
                .where(eq(schema.page_contents.id, "global_settings"));
        } else {
            await db.insert(schema.page_contents).values({
                id: "global_settings",
                hero: hero || {
                    title_en: "Golpahar Mohashoshan Kali Mandir",
                    title_bn: "গোলপাহাড় মহাশ্মশান কালী মন্দির",
                    description_en: "",
                    description_bn: ""
                },
                arthiSchedule: arthiSchedule || [],
                about: about || {},
                history: history || {},
                deities: deities || [],
                templeTimings: templeTimings || {},
                updatedAt: now,
            });
        }

        return c.json({
            success: true,
            message: "Site settings updated successfully!"
        });

    } catch (err) {
        console.error("Error updating settings:", err);
        return c.json({ success: false, message: "Failed to update settings" }, 500);
    }
});

export default contentRoutes;