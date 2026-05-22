// importamos la conexion a la db
import pool from '../config/db.js';

const ProveedoresModel = {

    // Obtener todos los proveedores
    async findAllProveedores() {
        const result = await pool.query(
            'SELECT * FROM proveedores'
        );

        return result.rows;
    },

    // Buscar proveedor por ID
    async findProveedorById(id_proveedor) {
        const result = await pool.query(
            'SELECT * FROM proveedores WHERE id_proveedor = $1',
            [id_proveedor]
        );

        return result.rows[0] || null;
    },

    // Crear proveedor
    async createNewProveedor(nombre_proveedor, telefono, email) {
        const result = await pool.query(
            `INSERT INTO proveedores (nombre_proveedor, telefono, email)
                VALUES ($1, $2, $3)
             RETURNING *`,
            [nombre_proveedor, telefono, email]
        );

        return result.rows[0];
    },

    // Actualización completa (ya recibe valores finales)
    async updateProveedores(id_proveedor, nombre_proveedor, telefono, email) {
        const result = await pool.query(
            `UPDATE proveedores SET nombre_proveedor = $1, telefono = $2, email = $3 WHERE id_proveedor = $4
             RETURNING *`,
            [nombre_proveedor, telefono, email, id_proveedor]
        );

        return result.rows[0] || null;
    },

    // Eliminar proveedor
    async removeProveedor(id_proveedor) {
        const result = await pool.query(
            'DELETE FROM proveedores WHERE id_proveedor = $1 RETURNING *',
            [id_proveedor]
        );

        return result.rows[0] || null;
    }
};

export default ProveedoresModel;