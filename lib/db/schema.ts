import { pgTable, uuid, text, integer, boolean, timestamp, pgEnum, jsonb } from 'drizzle-orm/pg-core';

/* ── Enums ───────────────────────────────────────────────── */

export const categoryEnum = pgEnum('category', ['hot_tub', 'swim_spa', 'mini_pool', 'sauna', 'accessory']);
export const powerSupplyEnum = pgEnum('power_supply', ['13_amp', '32_amp', 'hardwired']);
export const productStatusEnum = pgEnum('product_status', ['draft', 'active', 'archived']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'paid', 'processing', 'dispatched', 'delivered', 'cancelled', 'refunded']);
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'paid', 'partial', 'refunded']);
export const paymentMethodEnum = pgEnum('payment_method', ['stripe_card', 'klarna_pay_in_3', 'klarna_pay_in_30', 'klarna_financing', 'paypal']);
export const addressTypeEnum = pgEnum('address_type', ['billing', 'shipping']);
export const reviewStatusEnum = pgEnum('review_status', ['pending', 'approved', 'rejected']);
export const collectionStatusEnum = pgEnum('collection_status', ['active', 'archived']);

/* ── Brands ──────────────────────────────────────────────── */

export const brands = pgTable('brands', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  tagline: text('tagline'),
  story: jsonb('story'),
  heroVideoUrl: text('hero_video_url'),
  heroImageUrl: text('hero_image_url'),
  logoUrl: text('logo_url'),
  manufacturingCountry: text('manufacturing_country'),
  foundedYear: integer('founded_year'),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

/* ── Products ────────────────────────────────────────────── */

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  brandId: uuid('brand_id').references(() => brands.id),
  category: categoryEnum('category').notNull(),
  range: text('range'),
  descriptionShort: text('description_short'),
  descriptionLong: jsonb('description_long'),
  price: integer('price').notNull(), // pence
  compareAtPrice: integer('compare_at_price'),
  currency: text('currency').default('GBP').notNull(),
  status: productStatusEnum('status').default('active').notNull(),

  // Specs
  capacity: integer('capacity'),
  jets: integer('jets'),
  powerSupply: powerSupplyEnum('power_supply'),
  dimensionsMm: jsonb('dimensions_mm'), // { length, width, height }
  weightEmptyKg: integer('weight_empty_kg'),
  weightFullKg: integer('weight_full_kg'),
  waterCapacityLitres: integer('water_capacity_litres'),

  // Features
  hasLounger: boolean('has_lounger').default(false),
  hasBluetooth: boolean('has_bluetooth').default(false),
  hasLed: boolean('has_led').default(false),
  hasOzone: boolean('has_ozone').default(false),
  hasAppControl: boolean('has_app_control').default(false),
  insulationTier: text('insulation_tier'),
  energyRating: text('energy_rating'),

  // Media
  heroVideoUrl: text('hero_video_url'),
  heroImageUrl: text('hero_image_url'),
  gallery: jsonb('gallery'), // [{ url, alt, type: 'day'|'dusk'|'detail'|'lifestyle'|'overhead' }]

  // SEO
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  seoKeywords: text('seo_keywords').array(),

  // Inventory
  stockQuantity: integer('stock_quantity').default(0),
  lowStockThreshold: integer('low_stock_threshold').default(3),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

/* ── Product Variants ────────────────────────────────────── */

export const productVariants = pgTable('product_variants', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  name: text('name').notNull(), // e.g. 'Matte White'
  sku: text('sku').notNull().unique(),
  priceModifier: integer('price_modifier').default(0),
  swatchImageUrl: text('swatch_image_url'),
  heroImageUrl: text('hero_image_url'),
  stockQuantity: integer('stock_quantity').default(0),
});

/* ── Collections ─────────────────────────────────────────── */

export const collections = pgTable('collections', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  heroImageUrl: text('hero_image_url'),
  productIds: uuid('product_ids').array(),
  rules: jsonb('rules'),
  status: collectionStatusEnum('status').default('active').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

/* ── Customers ───────────────────────────────────────────── */

export const customers = pgTable('customers', {
  id: uuid('id').primaryKey(), // matches Supabase auth.users.id
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  phone: text('phone'),
  marketingConsent: boolean('marketing_consent').default(false),
  lifetimeValue: integer('lifetime_value').default(0),
  totalOrders: integer('total_orders').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

/* ── Addresses ───────────────────────────────────────────── */

export const addresses = pgTable('addresses', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').notNull().references(() => customers.id, { onDelete: 'cascade' }),
  type: addressTypeEnum('type').notNull(),
  name: text('name'),
  line1: text('line1'),
  line2: text('line2'),
  city: text('city'),
  postcode: text('postcode'),
  country: text('country').default('GB'),
  isDefault: boolean('is_default').default(false),
});

/* ── Orders ──────────────────────────────────────────────── */

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderNumber: text('order_number').notNull().unique(), // e.g. 'LUM-00001'
  customerId: uuid('customer_id').references(() => customers.id),
  status: orderStatusEnum('status').default('pending').notNull(),
  paymentMethod: paymentMethodEnum('payment_method'),
  paymentStatus: paymentStatusEnum('payment_status').default('pending').notNull(),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  klarnaOrderId: text('klarna_order_id'),
  subtotal: integer('subtotal').notNull(),
  vat: integer('vat').notNull(),
  shipping: integer('shipping').default(0),
  discount: integer('discount').default(0),
  total: integer('total').notNull(),
  currency: text('currency').default('GBP').notNull(),
  shippingAddress: jsonb('shipping_address'),
  billingAddress: jsonb('billing_address'),
  notes: text('notes'),
  internalNotes: text('internal_notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

/* ── Order Items ─────────────────────────────────────────── */

export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').references(() => products.id),
  variantId: uuid('variant_id').references(() => productVariants.id),
  productSnapshot: jsonb('product_snapshot').notNull(), // freeze at order time
  quantity: integer('quantity').notNull().default(1),
  pricePerUnit: integer('price_per_unit').notNull(),
  subtotal: integer('subtotal').notNull(),
});

/* ── Reviews ─────────────────────────────────────────────── */

export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id),
  customerId: uuid('customer_id').references(() => customers.id),
  orderId: uuid('order_id').references(() => orders.id),
  rating: integer('rating').notNull(), // 1–5
  title: text('title'),
  body: text('body'),
  images: text('images').array(),
  status: reviewStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

/* ── Configurator Results ────────────────────────────────── */

export const configuratorResults = pgTable('configurator_results', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email'),
  answers: jsonb('answers').notNull(),
  recommendedProductIds: uuid('recommended_product_ids').array(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  convertedToOrderId: uuid('converted_to_order_id').references(() => orders.id),
});

/* ── Abandoned Carts ─────────────────────────────────────── */

export const abandonedCarts = pgTable('abandoned_carts', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').references(() => customers.id),
  email: text('email'),
  cartData: jsonb('cart_data').notNull(),
  recoveredAt: timestamp('recovered_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

/* ── Wishlist ─────────────────────────────────────────────── */

export const wishlist = pgTable('wishlist', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id').notNull().references(() => customers.id, { onDelete: 'cascade' }),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  addedAt: timestamp('added_at', { withTimezone: true }).defaultNow(),
});

/* ── Audit Log ───────────────────────────────────────────── */

export const auditLog = pgTable('audit_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id'),
  action: text('action').notNull(),
  entityType: text('entity_type'),
  entityId: uuid('entity_id'),
  changes: jsonb('changes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

/* ── Type exports ────────────────────────────────────────── */

export type Brand = typeof brands.$inferSelect;
export type NewBrand = typeof brands.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type ProductVariant = typeof productVariants.$inferSelect;
export type Customer = typeof customers.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Review = typeof reviews.$inferSelect;
