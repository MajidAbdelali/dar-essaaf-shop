-- ===========================
-- DAR-ESSAAF-SHOP - DATABASE SCHEMA
-- Import via phpMyAdmin or: mysql -u root djerba_palms < schema.sql
-- ===========================

CREATE DATABASE IF NOT EXISTS djerba_palms
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE djerba_palms;

-- -------------------------------------------------------
-- CATEGORIES
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  slug       VARCHAR(100) NOT NULL UNIQUE,
  sort_order TINYINT UNSIGNED DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO categories (name, slug, sort_order) VALUES
  ('Woven Baskets',  'baskets', 1),
  ('Traditional Mats', 'mats',  2),
  ('Home Decor',     'decor',   3),
  ('Hats & Bags',    'fashion', 4);

-- -------------------------------------------------------
-- ARTISANS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS artisans (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(150) NOT NULL,
  village    VARCHAR(100) NOT NULL,
  bio        TEXT,
  specialty  VARCHAR(150),
  emoji      VARCHAR(10) DEFAULT '👤',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO artisans (name, village, bio, specialty, emoji) VALUES
  ('Fatma Ben Youssef', 'Midoun',     'Fatma has been weaving since age 12, learning at her grandmother\'s knee. Her baskets are renowned for their tight, intricate spiral patterns.', 'Coiled Baskets', '👩'),
  ('Ali Ghribi',        'Guellala',   'A third-generation weaver, Ali specialises in large decorative floor mats using traditional Smar techniques.', 'Smar Mats', '👨'),
  ('Maryem Jouini',     'Houmt Souk', 'Maryem started a small cooperative of 12 women in her village, helping artisans sell their work directly.', 'Hats & Bags', '👩'),
  ('Hassan Dhouibi',    'Ajim',       'Hassan brings engineering precision to traditional weaving. His storage pieces are structurally sound and beautifully patterned.', 'Storage Baskets', '👨'),
  ('Najoua Chaâbane',   'Midoun',     'Najoua experiments with natural dyes to create vivid, colorful wall hangings beloved worldwide.', 'Wall Decor', '👩'),
  ('Mohamed Krichen',   'Erriadh',    'The eldest artisan in our cooperative at 74, Mohamed has spent 60 years perfecting the traditional Djerbian chest.', 'Storage Chests', '👴');

-- -------------------------------------------------------
-- PRODUCTS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name           VARCHAR(200) NOT NULL,
  slug           VARCHAR(200) NOT NULL UNIQUE,
  description    TEXT,
  price          DECIMAL(10,3) NOT NULL,
  old_price      DECIMAL(10,3) DEFAULT NULL,
  emoji          VARCHAR(10)   DEFAULT '🧺',
  category_id    INT UNSIGNED  NOT NULL,
  artisan_id     INT UNSIGNED  DEFAULT NULL,
  rating         DECIMAL(2,1)  DEFAULT 0.0,
  review_count   INT UNSIGNED  DEFAULT 0,
  stock_quantity INT UNSIGNED  DEFAULT 100,
  stock_status   ENUM('in','low','out') DEFAULT 'in',
  badge          ENUM('best','new','sale') DEFAULT NULL,
  is_bestseller  TINYINT(1)    DEFAULT 0,
  is_featured    TINYINT(1)    DEFAULT 0,
  created_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (artisan_id)  REFERENCES artisans(id)
) ENGINE=InnoDB;

INSERT INTO products
  (name, slug, description, price, old_price, emoji, category_id, artisan_id, rating, review_count, stock_quantity, stock_status, badge, is_bestseller, is_featured)
VALUES
  ('Midoun Market Basket',      'midoun-market-basket',      'A classic coiled basket handwoven using the traditional spiral technique. Perfect for produce, storage, or décor.', 48.000, 60.000, '🧺', 1, 1, 4.8, 124, 50, 'in',  'best', 1, 1),
  ('Smar Woven Floor Mat',      'smar-woven-floor-mat',      'A beautiful Smar-style floor mat, taking 3–5 days to complete. Each mat is unique in its exact pattern.', 95.000, NULL,   '🪵', 2, 2, 4.6, 87,  30, 'in',  'new',  0, 1),
  ('Palm Frond Sun Hat',        'palm-frond-sun-hat',        'A classic Djerbian sun hat woven from young palm fronds. Lightweight, breathable, and naturally UV-resistant.', 35.000, NULL,   '👒', 4, 3, 4.9, 203, 3,  'low', NULL,   1, 1),
  ('Djerbian Herb Basket Set',  'djerbian-herb-basket-set',  'A set of 3 nesting herb baskets, dyed with natural plant pigments. Ideal for kitchen use or display.', 72.000, NULL,   '🌿', 1, 4, 4.7, 56,  40, 'in',  'sale', 0, 0),
  ('Woven Wall Hanging',        'woven-wall-hanging',        'A striking decorative wall piece with geometric Djerbian motifs in natural and indigo dyed palm fronds.', 120.000,NULL,   '🖼️', 3, 5, 4.5, 31,  20, 'in',  'new',  0, 1),
  ('Palm Leaf Tote Bag',        'palm-leaf-tote-bag',        'A roomy, durable tote woven from treated palm leaves. Great for the beach, market, or everyday use.', 55.000, NULL,   '👜', 4, 6, 4.7, 78,  5,  'low', NULL,   0, 0),
  ('Traditional Storage Chest', 'traditional-storage-chest', 'A full-size storage chest in the old Djerbian tradition. Hand-lashed with palm fibre cord on a wood frame.', 185.000,NULL,  '📦', 3, 6, 4.6, 22,  10, 'in',  NULL,   0, 1),
  ('Coiled Bread Basket',       'coiled-bread-basket',       'The quintessential Djerbian bread basket. Serves double duty as a fruit bowl or display piece.', 38.000, NULL,   '🍞', 1, 1, 4.9, 145, 60, 'in',  'best', 1, 1),
  ('Decorative Palm Platter',   'decorative-palm-platter',   'A flat woven platter with a striking sunburst pattern. Hang on the wall or use as a serving tray.', 65.000, NULL,   '🪙', 3, 2, 4.4, 44,  25, 'in',  NULL,   0, 0),
  ('Woven Shoulder Bag',        'woven-shoulder-bag',        'A structured shoulder bag with a leather handle strap and palm-woven body. Elegant and practical.', 88.000, NULL,   '👝', 4, 3, 4.8, 93,  15, 'in',  'new',  0, 1),
  ('Island Runner Mat',         'island-runner-mat',         'A long decorative runner perfect for hallways, dining tables, or mantles. In natural dune and sand tones.', 78.000, NULL,   '🌾', 2, 4, 4.6, 38,  4,  'low', NULL,   0, 0),
  ('Mediterranean Lantern Wrap','mediterranean-lantern-wrap','A decorative palm wrap for lanterns or candle holders. Creates beautiful shadow patterns when lit.', 42.000, NULL,   '🏮', 3, 5, 4.7, 61,  35, 'in',  NULL,   0, 0);

-- -------------------------------------------------------
-- PRODUCT IMAGES
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS product_images (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id INT UNSIGNED NOT NULL,
  url        VARCHAR(500) NOT NULL,
  alt_text   VARCHAR(200),
  sort_order TINYINT UNSIGNED DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- -------------------------------------------------------
-- USERS / CUSTOMERS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  first_name    VARCHAR(100),
  last_name     VARCHAR(100),
  password_hash VARCHAR(255),        -- nullable for guest orders
  is_guest      TINYINT(1) DEFAULT 0,
  is_admin      TINYINT(1) DEFAULT 0,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login    TIMESTAMP NULL
) ENGINE=InnoDB;

-- -------------------------------------------------------
-- ORDERS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id       INT UNSIGNED DEFAULT NULL,  -- NULL = guest
  email         VARCHAR(255) NOT NULL,
  first_name    VARCHAR(100) NOT NULL,
  last_name     VARCHAR(100),
  address       VARCHAR(300) NOT NULL,
  address2      VARCHAR(300),
  city          VARCHAR(100) NOT NULL,
  postal        VARCHAR(20),
  country       CHAR(2)      NOT NULL,
  phone         VARCHAR(30),
  subtotal      DECIMAL(10,3) NOT NULL,
  shipping_cost DECIMAL(10,3) NOT NULL DEFAULT 12.000,
  discount      DECIMAL(10,3) NOT NULL DEFAULT 0.000,
  total         DECIMAL(10,3) NOT NULL,
  status        ENUM('pending','confirmed','shipped','delivered','cancelled','refunded') DEFAULT 'pending',
  payment_method ENUM('card','cod') DEFAULT 'cod',
  notes         TEXT,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- -------------------------------------------------------
-- ORDER ITEMS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id   INT UNSIGNED NOT NULL,
  product_id INT UNSIGNED NOT NULL,
  quantity   SMALLINT UNSIGNED NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,3) NOT NULL,
  FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- -------------------------------------------------------
-- REVIEWS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS reviews (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id INT UNSIGNED NOT NULL,
  user_id    INT UNSIGNED DEFAULT NULL,
  name       VARCHAR(150),
  location   VARCHAR(150),
  rating     TINYINT UNSIGNED NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body       TEXT NOT NULL,
  is_approved TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE SET NULL
) ENGINE=InnoDB;

INSERT INTO reviews (product_id, name, location, rating, body, is_approved) VALUES
  (1, 'Sophie L.',   'Paris, France',  5, 'Absolutely beautiful! The craftsmanship is impeccable. I can feel how much time and skill went into making this piece.', 1),
  (1, 'Ibrahim K.',  'Dubai, UAE',     5, 'Third order from dar-essaaf-shop. Quality is consistently excellent. Fast shipping and gorgeous packaging.', 1),
  (3, 'Anna M.',     'Berlin, Germany',4, 'Really lovely piece. Colors are warm and natural. Slight variation from the photo but expected for handmade.', 1),
  (8, 'Lucia R.',    'Rome, Italy',    5, 'The bread basket is now the centrepiece of my kitchen table. Everyone asks where I got it!', 1),
  (2, 'James T.',    'London, UK',     5, 'Ordered 4 mats for our boutique. Guests love them. Will order again.', 1);

-- -------------------------------------------------------
-- NEWSLETTER SUBSCRIBERS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- -------------------------------------------------------
-- COUPONS
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS coupons (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code            VARCHAR(50) NOT NULL UNIQUE,
  discount_type   ENUM('percent','fixed') DEFAULT 'percent',
  discount_value  DECIMAL(10,3) NOT NULL,
  min_order       DECIMAL(10,3) DEFAULT 0,
  uses_max        INT UNSIGNED DEFAULT NULL,
  uses_count      INT UNSIGNED DEFAULT 0,
  expires_at      TIMESTAMP NULL,
  is_active       TINYINT(1) DEFAULT 1,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO coupons (code, discount_type, discount_value, is_active) VALUES
  ('DJERBA10', 'percent', 10.000, 1),
  ('WELCOME15','percent', 15.000, 1);

-- -------------------------------------------------------
-- WHOLESALE INQUIRIES
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS wholesale_inquiries (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  contact_name  VARCHAR(150),
  company_name  VARCHAR(200),
  email         VARCHAR(255) NOT NULL,
  phone         VARCHAR(50),
  business_type VARCHAR(100),
  quantity_est  VARCHAR(100),
  message       TEXT,
  status        ENUM('new','contacted','qualified','closed') DEFAULT 'new',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- -------------------------------------------------------
-- USEFUL VIEWS
-- -------------------------------------------------------

-- Order summary view for admin
CREATE OR REPLACE VIEW v_order_summary AS
SELECT
  o.id,
  o.email,
  CONCAT(o.first_name, ' ', o.last_name) AS customer_name,
  o.country,
  o.total,
  o.status,
  o.created_at,
  COUNT(oi.id)                           AS item_count
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id;

-- Product with category and artisan
CREATE OR REPLACE VIEW v_products AS
SELECT
  p.*,
  c.name  AS category_name,
  c.slug  AS category_slug,
  a.name  AS artisan_name,
  a.village AS artisan_village
FROM products p
JOIN categories c ON p.category_id = c.id
LEFT JOIN artisans a ON p.artisan_id = a.id;



