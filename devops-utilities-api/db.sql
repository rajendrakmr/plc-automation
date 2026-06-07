-- =========================================
-- USERS
-- =========================================

CREATE TABLE plc_m_users (
    user_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    first_name VARCHAR(100),
    last_name VARCHAR(100),

    phone VARCHAR(20),
    image_url VARCHAR(255),

    last_login DATETIME NULL DEFAULT NULL,

    status ENUM('active','inactive','blocked')
        DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_user_name (user_name),
    INDEX idx_user_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =========================================
-- CATEGORIES
-- =========================================

CREATE TABLE plc_m_categories (
    category_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    cat_name VARCHAR(255) NOT NULL,
    cat_slug VARCHAR(255) NOT NULL,

    cat_desc TEXT,

    meta_title VARCHAR(200),
    meta_keywords VARCHAR(500),
    meta_description TEXT,

    image_url VARCHAR(255),

    status TINYINT(1) NOT NULL DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY uk_category_slug (cat_slug),

    INDEX idx_category_status (status)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =========================================
-- PRODUCT TYPES
-- =========================================

CREATE TABLE plc_m_product_types (
    product_type_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,

    status TINYINT(1) DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_type_status (status)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =========================================
-- PRODUCTS
-- =========================================

CREATE TABLE plc_trn_products (
    product_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    category_id BIGINT UNSIGNED NOT NULL,
    product_type_id BIGINT UNSIGNED NOT NULL, 
    part_no VARCHAR(255) NOT NULL UNIQUE,
    url VARCHAR(255) NOT NULL UNIQUE,

    short_desc VARCHAR(500),
    product_desc LONGTEXT,

    image_url VARCHAR(255),

    meta_title VARCHAR(255),
    meta_keywords VARCHAR(255),
    meta_description VARCHAR(500),

    stock ENUM(
        'in-stock',
        'limited',
        'out-stock'
    ) DEFAULT 'in-stock',

    status ENUM(
        'draft',
        'published',
        'inactive',
        'archived'
    ) DEFAULT 'published',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_product_category
        FOREIGN KEY (category_id)
        REFERENCES plc_m_categories(category_id),

    CONSTRAINT fk_product_type
        FOREIGN KEY (product_type_id)
        REFERENCES plc_m_product_types(product_type_id),

    INDEX idx_product_category (category_id),
    INDEX idx_product_type (product_type_id),
    INDEX idx_product_status (status),

    INDEX idx_product_cat_status (category_id, status),

    INDEX idx_product_created (created_at),

    FULLTEXT KEY ft_product_search ( 
        short_desc,
        product_desc
    )

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =========================================
-- PRODUCT META
-- =========================================

CREATE TABLE plc_trn_product_meta (
    plc_trn_pmeta_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    product_id BIGINT UNSIGNED NOT NULL,

    meta_key VARCHAR(100) NOT NULL,
    meta_desc VARCHAR(255),
    meta_title VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_product_meta_product
        FOREIGN KEY (product_id)
        REFERENCES plc_trn_products(product_id)
        ON DELETE CASCADE,

    INDEX idx_product_meta_product (product_id),
    INDEX idx_meta_key (meta_key),
    INDEX idx_meta_key_value (meta_key, meta_desc)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =========================================
-- USER LOGIN HISTORY
-- =========================================

CREATE TABLE plc_trn_user_logins (
    login_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,

    login_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    ip_address VARCHAR(45),
    user_agent TEXT,

    CONSTRAINT fk_user_login_user
        FOREIGN KEY (user_id)
        REFERENCES plc_m_users(user_id)
        ON DELETE CASCADE,

    INDEX idx_login_user (user_id),
    INDEX idx_login_time (login_time)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



INSERT INTO plc_m_categories (
    category_id,
    cat_name,
    cat_slug,
    cat_desc,
    meta_title,
    meta_keywords,
    meta_description,
    image_url,
    status
)
SELECT
    c_id,
    c_name,
    c_url,
    c_desc,
    c_title,
    c_keyword,
    c_metadesc,
    c_image,
    c_status
FROM tbl_category;



INSERT IGNORE INTO plc_m_product_types (
    name
)
SELECT DISTINCT TRIM(ptype)
FROM tbl_product
WHERE ptype IS NOT NULL
  AND TRIM(ptype) <> '';



INSERT INTO plc_trn_products (
    product_id,
    category_id,
    product_type_id,
 
    part_no,
    url,

    short_desc,
    product_desc,

    image_url,

    meta_title,
    meta_keywords,
    meta_description
)
SELECT
    p.id,

    c.category_id,
    t.product_type_id,
 
    p.part,
    p.url,

    p.stext,
    p.ftext,

    p.pimage,

    p.mtag,
    p.mkey,
    p.mdesc

FROM tbl_product p

INNER JOIN plc_m_categories c
    ON c.category_id = p.cat

INNER JOIN plc_m_product_types t
    ON TRIM(LOWER(t.name))
       COLLATE utf8mb4_general_ci =
       TRIM(LOWER(p.ptype))
    
group by p.url;


INSERT INTO plc_trn_product_meta (
    product_id,
    meta_title,
    meta_key,
    meta_desc
)
SELECT
    p.product_id,
    pm.mtitle,
    pm.mkey,
    pm.mdesc
FROM plc_trn_products p
INNER JOIN tbl_productmeta pm
    ON pm.pid = p.product_id;