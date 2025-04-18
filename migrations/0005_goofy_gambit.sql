CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" text NOT NULL,
	"image" text NOT NULL,
	CONSTRAINT "categories_id_unique" UNIQUE("id")
);
