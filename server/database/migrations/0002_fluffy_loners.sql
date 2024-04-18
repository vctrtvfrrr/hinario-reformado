CREATE TABLE `songs_to_tags` (
	`song_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	PRIMARY KEY(`song_id`, `tag_id`),
	FOREIGN KEY (`song_id`) REFERENCES `songs`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);