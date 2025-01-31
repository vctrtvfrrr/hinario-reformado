CREATE TABLE IF NOT EXISTS "song_chords" (
	"id" serial PRIMARY KEY NOT NULL,
	"song_id" integer,
	"line" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "songs" DROP CONSTRAINT "songs_artist_id_artists_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "songs" ADD CONSTRAINT "songs_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "songs" DROP COLUMN IF EXISTS "chords";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "song_chords" ADD CONSTRAINT "song_chords_song_id_songs_id_fk" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
