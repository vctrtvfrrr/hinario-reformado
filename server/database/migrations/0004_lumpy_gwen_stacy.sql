CREATE TABLE IF NOT EXISTS "songs_to_tags" (
	"song_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	CONSTRAINT "songs_to_tags_song_id_tag_id_pk" PRIMARY KEY("song_id","tag_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "songs_to_tags" ADD CONSTRAINT "songs_to_tags_song_id_songs_id_fk" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "songs_to_tags" ADD CONSTRAINT "songs_to_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
