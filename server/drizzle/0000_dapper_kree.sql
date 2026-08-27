CREATE TYPE "public"."reading_status" AS ENUM('to-read', 'reading', 'finished');--> statement-breakpoint
CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"isbn" text,
	"description" text,
	"cover_url" text,
	"genre" text
);
--> statement-breakpoint
CREATE TABLE "user_books" (
	"user_id" text NOT NULL,
	"book_id" integer NOT NULL,
	"status" "reading_status" DEFAULT 'to-read' NOT NULL,
	"rating" smallint,
	"notes" text,
	"added_at" timestamp DEFAULT now() NOT NULL,
	"date_started" timestamp,
	"date_finished" timestamp,
	"favorite_quotes" text,
	"is_recommended" boolean DEFAULT false,
	CONSTRAINT "user_books_user_id_book_id_pk" PRIMARY KEY("user_id","book_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_books" ADD CONSTRAINT "user_books_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_books" ADD CONSTRAINT "user_books_book_id_books_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;