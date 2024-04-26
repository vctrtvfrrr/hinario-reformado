ALTER TABLE `songs` RENAME TO `__old_songs`;
--> statement-breakpoint
CREATE TABLE `artists` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(50) NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE TABLE `songs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(100) NOT NULL,
	`artist_id` integer,
	`lyrics` text NOT NULL,
	`chords` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text,
	FOREIGN KEY (`artist_id`) REFERENCES `artists`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`label` text(50) NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `artists_name_unique` ON `artists` (`name`);
--> statement-breakpoint
CREATE UNIQUE INDEX `songs_title_artist_id_unique` ON `songs` (`title`,`artist_id`);
--> statement-breakpoint
CREATE UNIQUE INDEX `tags_label_unique` ON `tags` (`label`);
--> statement-breakpoint
INSERT INTO `artists` (`name`)
SELECT DISTINCT `artist` FROM `__old_songs`
WHERE NOT EXISTS (SELECT 1 FROM `artists` a WHERE a.`name` = `__old_songs`.`artist`);
--> statement-breakpoint
INSERT INTO `songs` (`title`, `artist_id`, `lyrics`, `chords`)
SELECT os.`title`, a.`id`, os.`lyrics`, os.`chords`
FROM `__old_songs` os
JOIN `artists` a ON os.`artist` = a.`name`;
--> statement-breakpoint
DROP TABLE "__old_songs";