CREATE TABLE "cart" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text,
	"product_id" uuid,
	"quantity" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "cart_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "product_reviews" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;