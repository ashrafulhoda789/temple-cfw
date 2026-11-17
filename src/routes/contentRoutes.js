import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';
import { eq } from 'drizzle-orm';
import { protectedRoute, requireEditorOrAdmin } from '../middlewares/authMiddleware';
import { updateContentSchema } from '../validators/content.validator';

const contentRoutes = new Hono();

contentRoutes.get('/', async (c) => {
	const db = drizzle(c.env.DB, { schema });
	try {
		let contents = await db.select().from(schema.page_contents).where(eq(schema.page_contents.id, 'global_settings')).get();

		if (!contents) {
			return c.json({
				success: true,
				data: {
					hero: {
						title_en: 'Golpahar Mohashoshan Kali Mandir',
						title_bn: 'গোলপাহাড় মহাশ্মশান কালী মন্দির',
						description_en:
							'A place of prayer, peace and community. Dedicated to divine worship, spiritual awakening, and selfless social welfare in Chittagong.',
						description_bn:
							'প্রার্থনা, শান্তি এবং সম্প্রদায়ের একটি পবিত্র স্থান। চটগ্রামে দিব্য পূজা, আধ্যাত্মিক জাগরণ এবং নিঃস্বার্থ সমাজকল্যাণে নিবেদিত।',
						images: [
							{
								url: 'https://i.ibb.co.com/tw9CgxkX/temple1.jpg',
								caption_en: 'Golpahar Mohashoshan Kali Mandir',
								caption_bn: 'গোলপাহাড় মহাশ্মশান কালী মন্দির',
							},
							{
								url: 'https://i.ibb.co.com/nMC51Pmn/temple2.webp',
								caption_en: 'Evening Aarti',
								caption_bn: 'সন্ধ্যা আরতি',
							},
							{
								url: 'https://i.ibb.co.com/ZpDhhp2K/temple3.webp',
								caption_en: 'Temple View',
								caption_bn: 'মন্দির প্রাঙ্গণ',
							},
						],
					},
					arthiSchedule: [
						{
							title_en: 'Mangal Aarti',
							title_bn: 'মঙ্গলারতি',
							description_en: 'Early morning awakening prayers.',
							description_bn: 'ভোরবেলার আরতি ও প্রার্থনা।',
							time: '04:00 AM',
							start: '',
							end: '',
						},
						{
							title_en: 'Bhog Offering',
							title_bn: 'ভোগ নিবেদন',
							description_en: 'Mahaprabhune bhog dhruvavani vidhi.',
							description_bn: 'মহাপ্রভুর ভোগ ও ধ্রুববাণী বিধি।',
							time: '12:30 PM',
							start: '',
							end: '',
						},
						{
							title_en: 'Sandhya Aarti',
							title_bn: 'সন্ধ্যা আরতি',
							description_en: 'Sanjni divya aarti ane mahapuja.',
							description_bn: 'সন্ধ্যাবেলার দিব্য আরতি ও মহাপূজা।',
							time: '6:30 PM',
							start: '',
							end: '',
						},
						{
							title_en: 'Shital Bhog & Shayan',
							title_bn: 'শীতল ভোগ ও শয়ন',
							description_en: 'Ratrina samaye shital bhog ane shayan darshan.',
							description_bn: 'রাত্রিকালীন শীতল ভোগ ও শয়ন দর্শন।',
							time: '8:00 PM',
							start: '',
							end: '',
						},
					],
					about: {
						introduction: '',
						committeeOverview: '',
						members: [],
						messages: [],
					},
					history: {
						pageTitle_en: 'Sacred Heritage',
						pageTitle_bn: 'পবিত্র ঐতিহ্য',
						pageSubtitle_en: 'Golpahar Mohashoshan Kali Mandir',
						pageSubtitle_bn: 'গোলপাহাড় মহাশ্মশান কালী মন্দির',
						description_en: 'A revered spiritual sanctuary and vibrant center of faith in the heart of Chattogram.',
						description_bn: 'চট্টগ্রামের হৃদয়ে একটি শ্রদ্ধেয় আধ্যাত্মিক অভয়ারণ্য এবং বিশ্বাসের প্রাণবন্ত কেন্দ্র।',
						sanctuaryBadge_en: 'PANCHLAISH, CHATTOGRAM',
						sanctuaryBadge_bn: 'পাঁচলাইশ, চট্টগ্রাম',
						sanctuaryTitle_en: 'Location & Sanctuary',
						sanctuaryTitle_bn: 'অবস্থান ও অভয়ারণ্য',
						sanctuaryDesc_en:
							'Situated near the Golpahar intersection on O.R. Nizam Road, Panchlaish, Chattogram, this historic Kali Temple is a deeply revered and spiritually vibrant pilgrimage site for the local Sanatan Hindu community.',
						sanctuaryDesc_bn:
							'চট্টগ্রামের পাঁচলাইশের ও.আর. নিজাম রোডের গোলপাহাড় মোড়ের কাছে অবস্থিত এই ঐতিহাসিক কালী মন্দিরটি স্থানীয় সনাতন হিন্দু সম্প্রদায়ের জন্য একটি গভীর শ্রদ্ধেয় এবং আধ্যাত্মিক তীর্থস্থান।',
						dailyTime_en: '12:45 PM',
						dailyTime_bn: 'দুপুর ১২:৪৫',
						imageUrl: 'https://i.ibb.co.com/tw9CgxkX/temple1.jpg',
						templeInfos: [
							{
								title_en: 'Temple Entry',
								title_bn: 'মন্দির প্রবেশ',
								description_en: 'Free entry for all devotees and visitors.',
								description_bn: 'সকল ভক্ত ও দর্শনার্থীদের জন্য উন্মুক্ত প্রবেশাধিকার।',
							},
							{
								title_en: 'Photography',
								title_bn: 'ফটোগ্রাফি',
								description_en: 'Photography is allowed within the temple premises.',
								description_bn: 'মন্দির প্রাঙ্গণে ছবি তোলা অনুমোদিত।',
							},
							{
								title_en: 'Daily noon worship (Puja)',
								title_bn: 'দৈনিক দুপুরের পূজা',
								description_en: 'Daily noon worship (Puja) commences at 12:45 PM.',
								description_bn: 'দৈনিক দুপুরের পূজা দুপুর ১২:৪৫ মিনিটে শুরু হয়।',
							},
							{
								title_en: 'Best time to visit',
								title_bn: 'দর্শনের সেরা সময়',
								description_en: 'During Kali Puja and special evening Arati on Tuesdays and Saturdays.',
								description_bn: 'কালী পূজা এবং মঙ্গলবার ও শনিবারের বিশেষ সন্ধ্যা আরতির সময়।',
							},
						],
						milestones: [
							{
								icon: 'Calendar',
								badge_en: '38th Edition',
								badge_bn: '৩৮তম সংস্করণ',
								title_en: 'January 2025 Festival',
								title_bn: 'জানুয়ারি ২০২৫ উৎসব',
								description_en: 'In January 2025, the grand 4-day long 38th founding anniversary festival was successfully celebrated...',
								description_bn: 'জানুয়ারী ২০২৫ এ মহাশ্মশান ও মন্দির পরিচালনা কমিটির উদ্যোগে সফলভাবে উদযাপিত হয়...',
							},
							{
								icon: 'Award',
								badge_en: '39th Edition',
								badge_bn: '৩৯তম সংস্করণ',
								title_en: 'January 2026 Festival',
								title_bn: 'জানুয়ারি ২০২৬ উৎসব',
								description_en: 'In January 2026, the 39th anniversary featured maternal honors (Matri Sottar)...',
								description_bn: 'জানুয়ারী ২০২৬ এ ৩৯তম বার্ষিকীতে মাতৃত্ব সম্মাননা (মাতৃ সত্তার), আজীবন সম্মাননা প্রদান করা হয়।',
							},
							{
								icon: 'Sparkles',
								badge_en: 'Traditions',
								badge_bn: 'ঐতিহ্য',
								title_en: 'Major Rituals & 2020',
								title_bn: 'প্রধান আচার ও ২০২০',
								description_en: 'The temple also grandly observes Shivaratri Brata Puja and Annakut Utsav...',
								description_bn: 'মন্দিরটি মহাসমারোহে শিবরাত্রি ব্রত পূজা এবং অন্নকূট উৎসব পালন করে।',
							},
						],
					},
					deities: {
						pageTitle_en: 'TEMPLE DEITIES & REVERED SAGES',
						pageTitle_bn: 'মন্দিরের দেবতা ও পূজনীয় সাধকগণ',
						description_en: 'Introduction to Goddess Shmashanakali and the divine personalities associated with the temple premises.',
						description_bn: 'মা মহাশ্মশানকালী এবং মন্দির প্রাঙ্গণের সাথে যুক্ত দিব্য সত্ত্বাদের পরিচিতি।',
						presidingDeity: {
							badge_en: 'DIVINE SANCTUARY',
							badge_bn: 'পবিত্র অভয়ারণ্য',
							name_en: 'Sri Sri Shmashanakali Ma',
							name_bn: 'শ্রী শ্রী মহাশ্মশানকালী মা',
							description_en:
								'Golpahar Mohashoshan Kali Mandir is a sacred sanctuary dedicated to Goddess Shmashanakali, serving devotees with spiritual solace and divine grace.',
							description_bn:
								'গোলপাহাড় মহাশ্মশান কালী মন্দির মহাশ্মশানকালী মাতার প্রতি উৎসর্গীকৃত একটি পবিত্র অভয়ারণ্য, যা ভক্তদের আধ্যাত্মিক শান্তি ও কৃপা প্রদান করে।',
							imageUrl: 'https://i.ibb.co.com/ZpDhhp2K/temple3.webp',
							dailyPuja_en: '12:45 PM',
							dailyPuja_bn: 'দুপুর ১২:৪৫',
							eveningArati_en: 'Tuesdays & Saturdays',
							eveningArati_bn: 'মঙ্গলবার ও শনিবার',
							majorFestivals_en: 'Kali Puja & Anniversary',
							majorFestivals_bn: 'কালী পূজা ও বার্ষিক উৎসব',
							location_en: 'Golpahar Crematorium Premises',
							location_bn: 'গোলপাহাড় মহাশ্মশান প্রাঙ্গণ',
							shoeKeeping_en: 'Available',
							shoeKeeping_bn: 'উপলব্ধ আছে',
						},
						items: [],
					},
					templeTimings: {
						openingTime: '05:00 AM',
						closingTime: '09:00 PM',
						status: 'Open',
					},
				},
			});
		}

		return c.json(
			{
				success: true,
				data: contents,
			},
			200,
			{
				'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
			},
		);
	} catch (err) {
		console.error('Error fetching contents:', err);
		return c.json({ success: false, message: 'Internal Server Error' }, 500);
	}
});

contentRoutes.put('/', protectedRoute, requireEditorOrAdmin, async (c) => {
	const db = drizzle(c.env.DB, { schema });
	try {
		const body = await c.req.json();

		const validationResult = updateContentSchema.safeParse(body);
		if (!validationResult.success) {
			return c.json(
				{
					success: false,
					message: 'Validation failed',
					errors: validationResult.error.errors,
				},
				400,
			);
		}

		const { hero, arthiSchedule, about, history, deities, templeTimings } = validationResult.data;

		const existing = await db.select().from(schema.page_contents).where(eq(schema.page_contents.id, 'global_settings')).get();
		const now = new Date();

		if (existing) {
			await db
				.update(schema.page_contents)
				.set({
					hero: hero !== undefined ? hero : existing.hero,
					arthiSchedule: arthiSchedule !== undefined ? arthiSchedule : existing.arthiSchedule,
					about: about !== undefined ? about : existing.about,
					history: history !== undefined ? history : existing.history,
					deities: deities !== undefined ? deities : existing.deities,
					templeTimings: templeTimings !== undefined ? templeTimings : existing.templeTimings,
					updatedAt: now,
				})
				.where(eq(schema.page_contents.id, 'global_settings'));
		} else {
			await db.insert(schema.page_contents).values({
				id: 'global_settings',
				hero: hero || {
					title_en: 'Golpahar Mohashoshan Kali Mandir',
					title_bn: 'গোলপাহাড় মহাশ্মশান কালী মন্দির',
					description_en: '',
					description_bn: '',
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
			message: 'Site settings updated successfully!',
		});
	} catch (err) {
		console.error('Error updating settings:', err);
		return c.json({ success: false, message: 'Failed to update settings' }, 500);
	}
});

export default contentRoutes;
