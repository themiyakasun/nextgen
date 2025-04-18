import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  uuid,
  integer,
  primaryKey,
  boolean,
  doublePrecision,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';

export const ROLE_ENUM = pgEnum('role', ['USER', 'ADMIN']);
export const ADDRESS_TYPE_ENUM = pgEnum('address_type', [
  'SHIPPING',
  'BILLING',
]);

export const users = pgTable('users', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  password: text('password'),
  phoneNumber: text('phoneNumber'),
  role: ROLE_ENUM('role').default('USER'),
  created_at: timestamp('created_at', {
    withTimezone: true,
  }).defaultNow(),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
);

export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
);

export const addresses = pgTable('addresses', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  street: text('street').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  postalCode: text('postalCode').notNull(),
  country: text('country').notNull(),
});

export const userAddresses = pgTable('user_addresses', {
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  addressId: uuid('address_id').references(() => addresses.id),
  addressType: ADDRESS_TYPE_ENUM('address_type').default('SHIPPING'),
});

export const categories = pgTable('categories', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  category: text('category').notNull(),
  image: text('image').notNull(),
});

export const brands = pgTable('brands', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  brand: text('brand').notNull(),
  logo: text('logo').notNull(),
});

export const series = pgTable('series', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  seriesName: text('series_name').notNull(),
  categoryId: uuid('category_id')
    .references(() => categories.id)
    .notNull(),
  brandId: uuid('brand_id')
    .references(() => brands.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const products = pgTable('products', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  sku: text('sku').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  modelNumber: text('model_number').notNull(),
  price: doublePrecision('price').default(10.2).notNull(),
  discount: doublePrecision('discount'),
  stockQuantity: integer('stock_quantity').notNull(),
  warrantyPeriod: text('warranty_period').notNull(),
  isFeatured: boolean('is_featured').default(false),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  categoryId: uuid('categoryId')
    .references(() => categories.id)
    .notNull(),
  brandId: uuid('brand_id')
    .references(() => brands.id)
    .notNull(),
  seriesId: uuid('series_id').references(() => series.id),
});

export const productSpecifications = pgTable('product_specifications', {
  id: uuid('id').primaryKey().notNull().defaultRandom().unique(),
  specName: text('spec_name').notNull(),
  specValue: text('spec_value').notNull(),
  productId: uuid('product_id').references(() => products.id),
});

export const productImages = pgTable('product_images', {
  id: uuid('id').primaryKey().notNull().defaultRandom().unique(),
  productId: uuid('product_id')
    .references(() => products.id)
    .notNull(),
  image: text('image').notNull(),
  isPrimary: boolean('is_primary').default(true),
});
