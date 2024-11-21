-- Create ENUM type for order status
CREATE TYPE order_status_enum AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled');

-- Create ENUM type for payment status
CREATE TYPE payment_status_enum AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Create ENUM type for payment method
CREATE TYPE payment_method_enum AS ENUM ('credit_card', 'debit_card', 'wavepay', 'paypal', 'bank_transfer');

-- Create ENUM type for shipping status
CREATE TYPE shipping_status_enum AS ENUM ('pending', 'shipped', 'in_transit', 'delivered', 'returned');

-- Users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles table
CREATE TABLE roles (
    role_id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    permissions TEXT[] NOT NULL
);

-- User roles table
CREATE TABLE user_roles (
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(role_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Products table
CREATE TABLE products (
    product_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    seller_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Images table (to support multiple images per product)
CREATE TABLE product_images (
    image_id UUID PRIMARY KEY,
    product_id UUID REFERENCES products(product_id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    order_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    order_status order_status_enum NOT NULL,  -- Use the ENUM type
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items table
CREATE TABLE order_items (
    order_item_id UUID PRIMARY KEY,
    order_id UUID REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Shipping table (for tracking shipments)
CREATE TABLE shipping (
    shipping_id UUID PRIMARY KEY,
    order_id UUID REFERENCES orders(order_id) ON DELETE CASCADE,
    shipping_status shipping_status_enum NOT NULL,
    tracking_number VARCHAR(255),
    carrier VARCHAR(255),
    estimated_delivery_date TIMESTAMP,
    actual_delivery_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE payments (
    payment_id UUID PRIMARY KEY,
    order_id UUID REFERENCES orders(order_id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_status payment_status_enum NOT NULL,  -- Use the ENUM type
    payment_method payment_method_enum NOT NULL,  -- Use the ENUM type
    transaction_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table (for customer reviews on products)
CREATE TABLE reviews (
    review_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(product_id) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5),  -- Rating between 1 and 5
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Carts table (for storing items in a cart before checkout)
CREATE TABLE carts (
    cart_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart Items table (for storing items added to the cart)
CREATE TABLE cart_items (
    cart_item_id UUID PRIMARY KEY,
    cart_id UUID REFERENCES carts(cart_id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Coupons table (for promotional codes)
CREATE TABLE coupons (
    coupon_id UUID PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_percentage DECIMAL(5, 2) CHECK (discount_percentage BETWEEN 0 AND 100),
    valid_from TIMESTAMP,
    valid_until TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Coupon Redemptions table (tracks coupon usage by orders)
CREATE TABLE coupon_redemptions (
    redemption_id UUID PRIMARY KEY,
    coupon_id UUID REFERENCES coupons(coupon_id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(order_id) ON DELETE CASCADE,
    redeemed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table (for logging all financial transactions)
CREATE TABLE transactions (
    transaction_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_type VARCHAR(50), -- e.g., 'debit', 'credit'
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method payment_method_enum NOT NULL,  -- Use the ENUM type
    status VARCHAR(50),  -- e.g., 'successful', 'failed'
    details TEXT  -- Additional details about the transaction
);

CREATE TABLE categories (
    category_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    parent_category_id UUID REFERENCES categories(category_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE products
ADD category_id UUID REFERENCES categories(category_id) ON DELETE SET NULL;

CREATE TYPE status_enum AS ENUM ('active', 'inactive', 'hidden');

ALTER TABLE users
ADD COLUMN status status_enum DEFAULT 'active' NOT NULL;

ALTER TABLE categories
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;