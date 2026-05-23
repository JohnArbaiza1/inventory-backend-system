import pool from "../config/db.js";

const ProductsModel = {

    // Obtener todos los productos
    async findAllProducts() {
        const result = await pool.query(
            `SELECT * FROM products ORDER BY id_product ASC`
        );

        return result.rows;
    },

    // Obtener producto por ID
    async findProductById(id_product) {
        const result = await pool.query(
            `SELECT * FROM products WHERE id_product = $1`,
            [id_product]
        );

        return result.rows[0] || null;
    },

    // Crear producto
    async createProduct(nombre_producto, descripcion, precio, stock, id_categoria, id_proveedor) {
        const result = await pool.query(
            `INSERT INTO products
            (nombre_producto, descripcion, precio, stock, id_categoria, id_proveedor)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [nombre_producto, descripcion, precio, stock, id_categoria, id_proveedor]
        );

        return result.rows[0];
    },

    // Actualizar producto
    async updateProduct(id_product, nombre_producto, descripcion, precio, stock, id_categoria, id_proveedor) {
        const result = await pool.query(
            `UPDATE products
            SET nombre_producto = $1,
                descripcion = $2,
                precio = $3,
                stock = $4,
                id_categoria = $5,
                id_proveedor = $6,
                updated_at = CURRENT_TIMESTAMP
            WHERE id_product = $7
             RETURNING *`,
            [nombre_producto, descripcion, precio, stock, id_categoria, id_proveedor, id_product]
        );

        return result.rows[0] || null;
    },

    // Eliminar producto
    async deleteProduct(id_product) {
        const result = await pool.query(
            `DELETE FROM products WHERE id_product = $1 RETURNING *`,
            [id_product]
        );

        return result.rows[0] || null;
    }
};

export default ProductsModel;