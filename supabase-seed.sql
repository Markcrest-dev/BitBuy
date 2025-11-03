-- Seed Script for BitBuy E-Commerce Platform
-- Run this in Supabase SQL Editor

-- Insert Admin User (password: admin123)
INSERT INTO "User" (id, email, password, name, role, "createdAt", "updatedAt")
VALUES (
  'admin_' || gen_random_uuid()::text,
  'admin@bitbuy.com',
  '$2b$10$v3UK3x4SfOQ6Ag.Rfzd42uPhw0AO6g4cgJQn0gnxWSRmVFQb83NkO',
  'Admin User',
  'ADMIN',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Insert Test User (password: password123)
INSERT INTO "User" (id, email, password, name, phone, role, "createdAt", "updatedAt")
VALUES (
  'user_' || gen_random_uuid()::text,
  'user@example.com',
  '$2b$10$rgLxY9UKFJbxVisc52NuueMpykMEteXXd1yZnKbCXvUwynXspRmj6',
  'Test User',
  '+1234567890',
  'USER',
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Insert Categories
INSERT INTO "Category" (id, name, slug, description, image, "createdAt", "updatedAt")
VALUES
  ('cat_' || gen_random_uuid()::text, 'Electronics', 'electronics', 'Laptops, phones, tablets, and electronic accessories', '/images/categories/electronics.jpg', NOW(), NOW()),
  ('cat_' || gen_random_uuid()::text, 'Clothing', 'clothing', 'Men''s and women''s fashion clothing', '/images/categories/clothing.jpg', NOW(), NOW()),
  ('cat_' || gen_random_uuid()::text, 'Home & Garden', 'home-garden', 'Furniture, decor, and garden supplies', '/images/categories/home-garden.jpg', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Insert Products (using category slugs)
WITH categories AS (
  SELECT id, slug FROM "Category"
)
INSERT INTO "Product" (id, name, slug, description, price, "comparePrice", sku, inventory, images, "categoryId", featured, active, "createdAt", "updatedAt")
SELECT
  'prod_' || gen_random_uuid()::text,
  'Premium Laptop',
  'premium-laptop',
  'High-performance laptop for professionals',
  1299.99,
  1499.99,
  'LAPTOP-001',
  50,
  ARRAY['/images/products/laptop.jpg'],
  c.id,
  true,
  true,
  NOW(),
  NOW()
FROM categories c WHERE c.slug = 'electronics'
ON CONFLICT (slug) DO NOTHING;

WITH categories AS (
  SELECT id, slug FROM "Category"
)
INSERT INTO "Product" (id, name, slug, description, price, sku, inventory, images, "categoryId", active, "createdAt", "updatedAt")
SELECT
  'prod_' || gen_random_uuid()::text,
  'Wireless Headphones',
  'wireless-headphones',
  'Premium noise-cancelling headphones',
  299.99,
  'HEADPHONES-001',
  100,
  ARRAY['/images/products/headphones.jpg'],
  c.id,
  true,
  NOW(),
  NOW()
FROM categories c WHERE c.slug = 'electronics'
ON CONFLICT (slug) DO NOTHING;

WITH categories AS (
  SELECT id, slug FROM "Category"
)
INSERT INTO "Product" (id, name, slug, description, price, sku, inventory, images, "categoryId", active, "createdAt", "updatedAt")
SELECT
  'prod_' || gen_random_uuid()::text,
  'Cotton T-Shirt',
  'cotton-tshirt',
  'Comfortable 100% cotton t-shirt',
  29.99,
  'TSHIRT-001',
  200,
  ARRAY['/images/products/tshirt.jpg'],
  c.id,
  true,
  NOW(),
  NOW()
FROM categories c WHERE c.slug = 'clothing'
ON CONFLICT (slug) DO NOTHING;

-- Insert Currencies
INSERT INTO "Currency" (id, code, name, symbol, rate, "isActive", "updatedAt")
VALUES
  ('curr_' || gen_random_uuid()::text, 'USD', 'US Dollar', '$', 1.0, true, NOW()),
  ('curr_' || gen_random_uuid()::text, 'EUR', 'Euro', '€', 0.85, true, NOW()),
  ('curr_' || gen_random_uuid()::text, 'GBP', 'British Pound', '£', 0.73, true, NOW())
ON CONFLICT (code) DO NOTHING;

-- Verify data
SELECT 'Users:' as table_name, COUNT(*) as count FROM "User"
UNION ALL
SELECT 'Categories:', COUNT(*) FROM "Category"
UNION ALL
SELECT 'Products:', COUNT(*) FROM "Product"
UNION ALL
SELECT 'Currencies:', COUNT(*) FROM "Currency";
