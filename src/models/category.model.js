// importamos la conexion a la db
import pool from '../config/db.js';

// Definimos un objeto que contenga los métodos relacionados con la tabla categories
const CategoryModel = {

    // Obtiene las categories y las ordena por fecha de creación
    async findAll() {
        const result = await pool.query(
            'SELECT * FROM categories ORDER BY created_at DESC'
        );
        return result.rows;
    },

    // Busca las categories por su id
    async findById(category_id) {
        const result = await pool.query(
            'SELECT * FROM categories WHERE category_id = $1',
            [category_id]
        );
        return result.rows[0] || null;
    },

    // Para crear nuevas categories
    async createCategory(category_name, description) {
        const result = await pool.query(
            'INSERT INTO categories(category_name, description) VALUES ($1, $2) RETURNING *',
            [category_name, description]
        );
        return result.rows[0];
    },

    // Para actualizar categories existentes usando el id
    async updateCategory(category_id, category_name, description) {
        const result = await pool.query(
            'UPDATE categories SET category_name = $1, description = $2 WHERE category_id = $3 RETURNING *',
            [category_name, description, category_id]
        );
        return result.rows[0] || null;
    },

    // Elimina una category por ID
    async remove(category_id) {
        const result = await pool.query(
            'DELETE FROM categories WHERE category_id = $1 RETURNING *',
            [category_id]
        );
        return result.rows[0] || null;
    }
};

export default CategoryModel;

