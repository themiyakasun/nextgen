CREATE TABLE "addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"street" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"postalCode" text NOT NULL,
	"country" text NOT NULL,
	CONSTRAINT "addresses_id_unique" UNIQUE("id")
);
