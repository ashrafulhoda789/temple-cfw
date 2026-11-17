CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer NOT NULL,
	`image` text,
	`role` text DEFAULT 'editor' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `page_contents` (
	`id` text PRIMARY KEY NOT NULL,
	`hero` text NOT NULL,
	`arthi_schedule` text NOT NULL,
	`about` text NOT NULL,
	`history` text NOT NULL,
	`deities` text NOT NULL,
	`temple_timings` text NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pujas` (
	`id` text PRIMARY KEY NOT NULL,
	`title_en` text NOT NULL,
	`title_bn` text NOT NULL,
	`description_en` text DEFAULT '',
	`description_bn` text DEFAULT '',
	`price` real DEFAULT 0 NOT NULL,
	`date_en` text DEFAULT '',
	`date_bn` text DEFAULT '',
	`time` text DEFAULT '',
	`type_en` text DEFAULT '',
	`type_bn` text DEFAULT '',
	`location_en` text DEFAULT '',
	`location_bn` text DEFAULT '',
	`image` text DEFAULT '',
	`rules_en` text DEFAULT '',
	`rules_bn` text DEFAULT '',
	`is_available` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `event_schedules` (
	`id` text PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`day_label_en` text NOT NULL,
	`day_label_bn` text NOT NULL,
	`schedule_date` text NOT NULL,
	`day_title_en` text DEFAULT '',
	`day_title_bn` text DEFAULT '',
	`activities` text DEFAULT '[]',
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`title_en` text NOT NULL,
	`title_bn` text NOT NULL,
	`category_en` text DEFAULT '',
	`category_bn` text DEFAULT '',
	`description_en` text DEFAULT '',
	`description_bn` text DEFAULT '',
	`cover_image` text DEFAULT '',
	`event_date_time` text NOT NULL,
	`location_en` text DEFAULT '',
	`location_bn` text DEFAULT '',
	`organizer_en` text DEFAULT '',
	`organizer_bn` text DEFAULT '',
	`is_registration_required` integer DEFAULT false NOT NULL,
	`registration_deadline` text DEFAULT '',
	`event_status` text DEFAULT 'Upcoming' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `notices` (
	`id` text PRIMARY KEY NOT NULL,
	`title_en` text NOT NULL,
	`title_bn` text NOT NULL,
	`category_en` text DEFAULT 'General',
	`category_bn` text DEFAULT 'সাধারণ',
	`description_en` text NOT NULL,
	`description_bn` text NOT NULL,
	`attachment_url` text DEFAULT '',
	`publish_date` text NOT NULL,
	`expiry_date` text DEFAULT '',
	`is_pinned` integer DEFAULT false NOT NULL,
	`status` text DEFAULT 'Published' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `gallery_albums` (
	`id` text PRIMARY KEY NOT NULL,
	`title_en` text NOT NULL,
	`title_bn` text NOT NULL,
	`description_en` text DEFAULT '',
	`description_bn` text DEFAULT '',
	`cover_image` text DEFAULT '',
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `gallery_media` (
	`id` text PRIMARY KEY NOT NULL,
	`album_id` text,
	`title_en` text DEFAULT '',
	`title_bn` text DEFAULT '',
	`caption_en` text DEFAULT '',
	`caption_bn` text DEFAULT '',
	`media_url` text NOT NULL,
	`media_type` text DEFAULT 'image' NOT NULL,
	`is_featured_video` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `committee_members` (
	`id` text PRIMARY KEY NOT NULL,
	`name_en` text NOT NULL,
	`name_bn` text NOT NULL,
	`position_en` text NOT NULL,
	`position_bn` text NOT NULL,
	`photo_url` text DEFAULT '',
	`phone` text DEFAULT '',
	`email` text DEFAULT '',
	`display_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `contacts` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text DEFAULT '',
	`phone` text DEFAULT '',
	`message` text NOT NULL,
	`reply_message` text DEFAULT '',
	`status` text DEFAULT 'new' NOT NULL,
	`replied_at` text DEFAULT '',
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `donations` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text DEFAULT 'Anonymous' NOT NULL,
	`phone` text NOT NULL,
	`amount` real NOT NULL,
	`payment_method` text NOT NULL,
	`transaction_id` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP
);
