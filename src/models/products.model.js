import pool from "../config/db.js";

const ProductsModel = {

    // Obtener todos los productos
    async findAllProducts() {
        const result = await pool.query(
            `SELECT * FROM products ORDER BY product_id ASC`
        );

        return result.rows;
    },

    // Obtener producto por ID
    async findProductById(product_id) {
        const result = await pool.query(
            `SELECT * FROM products WHERE product_id = $1`,
            [product_id]
        );

        return result.rows[0] || null;
    },

    // Crear producto
    async createProduct(product_name, description, price, stock, category_id, supplier_id) {
        const result = await pool.query(
            `INSERT INTO products
            (product_name, description, price, stock, category_id, supplier_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [product_name, description, price, stock, category_id, supplier_id]
        );

        return result.rows[0];
    },

    // Actualizar producto
    async updateProduct(product_id, product_name, description, price, stock, category_id, supplier_id) {
        const result = await pool.query(
            `UPDATE products
            SET product_name = $1,
                description = $2,
                price = $3,
                stock = $4,
                category_id = $5,
                supplier_id = $6,
                updated_at = CURRENT_TIMESTAMP
            WHERE product_id = $7
             RETURNING *`,
            [product_name, description, price, stock, category_id, supplier_id, product_id]
        );

        return result.rows[0] || null;
    },

    // Eliminar producto
    async deleteProduct(product_id) {
        const result = await pool.query(
            `DELETE FROM products WHERE product_id = $1 RETURNING *`,
            [product_id]
        );

        return result.rows[0] || null;
    }
};

export default ProductsModel;