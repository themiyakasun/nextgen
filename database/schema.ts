import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  uuid,
  integer,
  primaryKey,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const ADDRESS_TYPE_ENUM = pgEnum("address_type", [
  "SHIPPING",
  "BILLING",
]);

export const users = pgTable("users", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  phoneNumber: text("phoneNumber"),
  role: ROLE_ENUM("role").default("USER"),
  created_at: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ],
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ],
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ],
);

export const addresses = pgTable("addresses", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  street: text("street").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  postalCode: text("postalCode").notNull(),
  country: text("country").notNull(),
});

export const userAddresses = pgTable("user_addresses", {
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  addressId: uuid("address_id").references(() => addresses.id),
  addressType: ADDRESS_TYPE_ENUM("address_type").default("SHIPPING"),
});
