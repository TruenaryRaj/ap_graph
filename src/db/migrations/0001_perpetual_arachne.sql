CREATE TABLE `todo` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255),
	`description` varchar(255),
	`user_id` int NOT NULL,
	CONSTRAINT `todo_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `todo` ADD CONSTRAINT `todo_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;