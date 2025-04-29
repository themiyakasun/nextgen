CREATE TABLE "coupon_redemptions" (
	"code_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"used_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "coupon_redemptions" ADD CONSTRAINT "coupon_redemptions_code_id_discount_codes_id_fk" FOREIGN KEY ("code_id") REFERENCES "public"."discount_codes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "coupon_redemptions" ADD CONSTRAINT "coupon_redemptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;