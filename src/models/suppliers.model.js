// importamos la conexion a la db
import pool from "../config/db.js";

const SuppliersModel = {

    // Obtener todos los suppliers
    async findAllSuppliers() {
        const result = await pool.query(
            'SELECT * FROM suppliers'
        );
        return result.rows;
    },

    // Buscar supplier por ID
    async findSupplierById(supplier_id) {
        const result = await pool.query(
            'SELECT * FROM suppliers WHERE supplier_id = $1',
            [supplier_id]
        );
        return result.rows[0] || null;
    },

    // Crear supplier
    async createSupplier(supplier_name, phone, email) {
        const result = await pool.query(
            `INSERT INTO suppliers (supplier_name, phone, email)
                VALUES ($1, $2, $3)
             RETURNING *`,
            [supplier_name, phone, email]
        );
        return result.rows[0];
    },

    // Actualización completa
    async updateSupplier(supplier_id, supplier_name, phone, email) {
        const result = await pool.query(
            `UPDATE suppliers SET supplier_name = $1, phone = $2, email = $3 WHERE supplier_id = $4
             RETURNING *`,
            [supplier_name, phone, email, supplier_id]
        );
        return result.rows[0] || null;
    },

    // Eliminar supplier
    async removeSupplier(supplier_id) {
        const result = await pool.query(
            'DELETE FROM suppliers WHERE supplier_id = $1 RETURNING *',
            [supplier_id]
        );
        return result.rows[0] || null;
    }
};

export default SuppliersModel;