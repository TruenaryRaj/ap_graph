CREATE TABLE `verification_code` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255),
	`code` varchar(255),
	`expires_at` timestamp,
	CONSTRAINT `verification_code_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_email_unique` UNIQUE(`email`);