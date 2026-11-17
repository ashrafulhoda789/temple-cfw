import { z } from "zod";

const heroSchema = z.object({
    title_en: z.string().min(1, "English title is required"),
    title_bn: z.string().min(1, "Bangla title is required"),
    description_en: z.string().optional().default(""),
    description_bn: z.string().optional().default(""),
    images: z.array(
        z.object({
            url: z.string().url("Invalid image URL"),
            caption_en: z.string().optional().default(""),
            caption_bn: z.string().optional().default("")
        })
    ).optional().default([])
});


const aartiItemSchema = z.object({
    title_en: z.string().min(1, "Aarti English title is required"),
    title_bn: z.string().min(1, "Aarti Bangla title is required"),
    description_en: z.string().optional().default(""),
    description_bn: z.string().optional().default(""),
    time: z.string().optional().default(""),
    start: z.string().optional().default(""),
    end: z.string().optional().default("")
});

const aboutCardSchema = z.object({
    icon: z.string().optional().default("Flame"),
    title_en: z.string().optional().default(""),
    title_bn: z.string().optional().default(""),
    description_en: z.string().optional().default(""),
    description_bn: z.string().optional().default(""),
    order: z.number().optional().default(0)
});

const aboutSchema = z.object({
    pageTitle_en: z.string().optional().default("About Us"),
    pageTitle_bn: z.string().optional().default("আমাদের সম্পর্কে"),
    pageSubtitle_en: z.string().optional().default(""),
    pageSubtitle_bn: z.string().optional().default(""),
    imageUrl: z.string().optional().default(""),
    whoWeAreTag_en: z.string().optional().default("WHO WE ARE"),
    whoWeAreTag_bn: z.string().optional().default("আমাদের পরিচয়"),
    whoWeAreTitle_en: z.string().optional().default(""),
    whoWeAreTitle_bn: z.string().optional().default(""),
    whoWeAreDesc1_en: z.string().optional().default(""),
    whoWeAreDesc1_bn: z.string().optional().default(""),
    whoWeAreDesc2_en: z.string().optional().default(""),
    whoWeAreDesc2_bn: z.string().optional().default(""),
    quote_en: z.string().optional().default(""),
    quote_bn: z.string().optional().default(""),
    heritageTag_en: z.string().optional().default("TEMPLE HERITAGE & OVERVIEW"),
    heritageTag_bn: z.string().optional().default("মন্দিরের ঐতিহ্য ও বিবরণ"),
    heritageTitle_en: z.string().optional().default(""),
    heritageTitle_bn: z.string().optional().default(""),
    heritageSubtitle_en: z.string().optional().default(""),
    heritageSubtitle_bn: z.string().optional().default(""),
    cards: z.array(aboutCardSchema).optional().default([]),
    introduction: z.string().optional().default(""),
    committeeOverview: z.string().optional().default(""),
    members: z.array(z.any()).optional().default([]),
    messages: z.array(z.any()).optional().default([])
});


const milestoneItemSchema = z.object({
    icon: z.string().optional().default("Calendar"),
    badge_en: z.string().optional().default(""),
    badge_bn: z.string().optional().default(""),
    title_en: z.string().min(1, "Milestone English title is required"),
    title_bn: z.string().min(1, "Milestone Bangla title is required"),
    description_en: z.string().optional().default(""),
    description_bn: z.string().optional().default(""),
    order: z.number().optional().default(0)
});

const templeInfoItemSchema = z.object({
    title_en: z.string().optional().default(""),
    title_bn: z.string().optional().default(""),
    description_en: z.string().optional().default(""),
    description_bn: z.string().optional().default("")
});

const historySchema = z.object({
    pageTitle_en: z.string().optional().default("Sacred Heritage"),
    pageTitle_bn: z.string().optional().default("পবিত্র ঐতিহ্য"),
    pageSubtitle_en: z.string().optional().default("Golpahar Mohashoshan Kali Mandir"),
    pageSubtitle_bn: z.string().optional().default("গোলপাহাড় মহাশ্মশান কালী মন্দির"),
    description_en: z.string().optional().default("A revered spiritual sanctuary and vibrant center of faith in the heart of Chattogram."),
    description_bn: z.string().optional().default("চট্টগ্রামের হৃদয়ে একটি শ্রদ্ধেয় আধ্যাত্মিক অভয়ারণ্য এবং বিশ্বাসের প্রাণবন্ত কেন্দ্র।"),

    sanctuaryBadge_en: z.string().optional().default("PANCHLAISH, CHATTOGRAM"),
    sanctuaryBadge_bn: z.string().optional().default("পাঁচলাইশ, চট্টগ্রাম"),
    sanctuaryTitle_en: z.string().optional().default("Location & Sanctuary"),
    sanctuaryTitle_en_val: z.string().optional().default("অবস্থান ও অভয়ারণ্য"),
    sanctuaryTitle_bn: z.string().optional().default("অবস্থান ও অভয়ারণ্য"),
    sanctuaryDesc_en: z.string().optional().default("Situated near the Golpahar intersection on O.R. Nizam Road..."),
    sanctuaryDesc_bn: z.string().optional().default("ও.আর. নিজাম রোডের গোলপাহাড় মোড়ের কাছে অবস্থিত..."),
    dailyTime_en: z.string().optional().default("12:45 PM"),
    dailyTime_bn: z.string().optional().default("দুপুর ১২:৪৫"),
    imageUrl: z.string().optional().default(""),

    templeInfos: z.array(templeInfoItemSchema).optional().default([]),
    milestones: z.array(milestoneItemSchema).optional().default([]),

    templeHistory: z.string().optional().default(""),
    mohashoshanHistory: z.string().optional().default("")
});

const deityItemSchema = z.object({
    name_en: z.string().min(1, "Deity name in English is required"),
    name_bn: z.string().min(1, "Deity name in Bangla is required"),
    imageUrl: z.string().optional().default(""),
    description_en: z.string().optional().default(""),
    description_bn: z.string().optional().default(""),
    birthDeath_en: z.string().optional().default(""), 
    birthDeath_bn: z.string().optional().default(""),
    order: z.number().optional().default(0)
});

const presidingDeitySchema = z.object({
    badge_en: z.string().optional().default("DIVINE SANCTUARY"),
    badge_bn: z.string().optional().default("পবিত্র অভয়ারণ্য"),
    name_en: z.string().optional().default("Sri Sri Shmashanakali Ma"),
    name_bn: z.string().optional().default("শ্রী শ্রী মহাশ্মশানকালী মা"),
    description_en: z.string().optional().default("Golpahar Mohashoshan Kali Mandir is a sacred sanctuary dedicated to Goddess Shmashanakali..."),
    description_bn: z.string().optional().default("গোলপাহাড় মহাশ্মশান কালী মন্দির মহাশ্মশানকালী মায়োজিত একটি পবিত্র তীর্থস্থান..."),
    imageUrl: z.string().optional().default("https://i.ibb.co.com/tw9CgxkX/temple1.jpg"),
    // Quick Overview Fields
    dailyPuja_en: z.string().optional().default("12:45 PM"),
    dailyPuja_bn: z.string().optional().default("দুপুর ১২:৪৫"),
    eveningArati_en: z.string().optional().default("Tuesdays & Saturdays"),
    eveningArati_bn: z.string().optional().default("মঙ্গলবার ও শনিবার"),
    majorFestivals_en: z.string().optional().default("Kali Puja & Anniversary"),
    majorFestivals_bn: z.string().optional().default("কালী পূজা ও বাৎসরিক উৎসব"),
    location_en: z.string().optional().default("Golpahar Crematorium Premises"),
    location_bn: z.string().optional().default("গোলপাহাড় মহাশ্মশান প্রাঙ্গণ"),
    shoeKeeping_en: z.string().optional().default("Available"),
    shoeKeeping_bn: z.string().optional().default("উপলব্ধ আছে")
});

const deitiesPageSchema = z.object({
    pageTitle_en: z.string().optional().default("TEMPLE DEITIES & REVERED SAGES"),
    pageTitle_bn: z.string().optional().default("মন্দিরের দেবতা ও পূজনীয় সাধকগণ"),
    description_en: z.string().optional().default("Introduction to Goddess Shmashanakali and the divine personalities associated with the temple premises."),
    description_bn: z.string().optional().default("মা মহাশ্মশানকালী এবং মন্দির প্রাঙ্গণের সাথে যুক্ত দিব্য সত্ত্বাদের পরিচিতি।"),
    presidingDeity: presidingDeitySchema.optional().default({}),
    items: z.array(deityItemSchema).optional().default([])
});


const templeTimingsSchema = z.object({
    openingTime: z.string().optional().default(""),
    closingTime: z.string().optional().default(""),
    status: z.string().optional().default("")
});

export const updateContentSchema = z.object({
    hero: heroSchema.optional(),
    arthiSchedule: z.array(aartiItemSchema).optional(),
    about: aboutSchema.optional(),
    history: historySchema.optional(),
    deities: deitiesPageSchema.optional(),
    templeTimings: templeTimingsSchema.optional()
});