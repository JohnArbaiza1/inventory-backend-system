CREATE TABLE products(
    id_product SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(250) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_categoria int,
    id_proveedor int,
    FOREIGN KEY (id_categoria) REFERENCES categories(id_categoria) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT chk_stock_productos CHECK (stock >= 0),
    CONSTRAINT chk_precio_productos CHECK (precio > 0.0)
);