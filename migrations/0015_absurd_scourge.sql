CREATE TABLE "discount_codes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"valid_till" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "discount_codes_id_unique" UNIQUE("id"),
	CONSTRAINT "discount_codes_code_unique" UNIQUE("code")
);
