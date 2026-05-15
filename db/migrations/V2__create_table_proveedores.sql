CREATE TABLE proveedores(
    id_proveedor SERIAL PRIMARY KEY,
    nombre_proveedor VARCHAR(250) NOT NULL,
    telefono VARCHAR(9) NOT NULL,
    email VARCHAR(100) NOT NULL,
    estado BOOLEAN DEFAULT true,
    CONSTRAINT uq_email_proveedor UNIQUE(email)
);