CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    supplier_name VARCHAR(250) NOT NULL,
    phone VARCHAR(9) NOT NULL,
    email VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    CONSTRAINT uq_supplier_email UNIQUE(email)
);