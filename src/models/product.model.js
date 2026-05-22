// importamos la conexion a la db
import pool from '../config/db.js';

// Definimos un objeto que contenga los mentodos relacionado con la tabla productos
const ProductModel = {

    // Obtiene todos los productos
    async findAllProducts(){
        const result = await pool.query(
            'SELECT * FROM products ORDER BY created_at DESC'
        );

        return result.rows;
    },

    // Para buscar por el id
    async findProductById(id_product) {
        const result = await pool.query(
            'SELECT * FROM products WHERE id_product =) $1',
            [id_product]
        );

        return result.rows[0] || null;
    }


}