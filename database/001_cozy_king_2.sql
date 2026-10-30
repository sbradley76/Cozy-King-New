-- Cozy King 2.0 additions.
-- Existing legacy `users` and `dealer_logins` tables are intentionally reused.

CREATE TABLE IF NOT EXISTS cozy_contract_inquiries (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  company VARCHAR(160) NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(60) NULL,
  project_type VARCHAR(120) NULL,
  estimated_units VARCHAR(80) NULL,
  target_timing VARCHAR(120) NULL,
  message TEXT NOT NULL,
  status ENUM('new','contacted','quoted','closed') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_cozy_inquiry_status_created (status, created_at),
  KEY idx_cozy_inquiry_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cozy_orders (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_number VARCHAR(40) NOT NULL,
  dealer_id BIGINT NOT NULL,
  vendor_name VARCHAR(190) NULL,
  po_number VARCHAR(100) NULL,
  contact_name VARCHAR(120) NOT NULL,
  contact_email VARCHAR(190) NOT NULL,
  contact_phone VARCHAR(60) NULL,
  notes TEXT NULL,
  status ENUM('submitted','reviewing','confirmed','production','shipped','cancelled') NOT NULL DEFAULT 'submitted',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_cozy_order_number (order_number),
  KEY idx_cozy_orders_dealer (dealer_id),
  KEY idx_cozy_orders_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cozy_order_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id BIGINT UNSIGNED NOT NULL,
  product_type VARCHAR(120) NOT NULL,
  model VARCHAR(120) NOT NULL,
  mechanism VARCHAR(160) NULL,
  fabric VARCHAR(190) NULL,
  quantity INT UNSIGNED NOT NULL DEFAULT 1,
  configuration_notes TEXT NULL,
  PRIMARY KEY (id),
  KEY idx_cozy_order_items_order (order_id),
  CONSTRAINT fk_cozy_order_items_order FOREIGN KEY (order_id) REFERENCES cozy_orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
