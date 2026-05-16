// importamos la conexion a la db
import pool from '../config/db.js';

// Definimos un objeto que contenga los mentodos relacionado con la tabla categorias
const CategoryModel = {

    //Obtendra las categorias y las ordenara por fecha de creación
    async findAll(){

        //Ejecuta la consulta sql
        const result = await pool.query(
            'SELECT * FROM categories ORDER BY fecha_creacion DESC'
        );

        //Retornamos las filas obtenidas
        return result.rows;
    },

    //Busca las categorias por su id
    async findById(id_categoria){
        const result = await pool.query(
            'SELECT * FROM categories WHERE id_categoria = $1',
            [id_categoria]
        );

        return result.rows[0] || null;
    },

    // Para crear nuevas categorias
    async createCategories(nombre_categoria, descripcion){
        const result = await pool.query(
            'INSERT INTO categories(nombre_categoria, descripcion) VALUES ($1, $2) RETURNING *',
            [nombre_categoria, descripcion]
        );

        return result.rows[0];
    },

    //Para actualizar categorias existentes usando el id
    async updateCategories(id_categoria, nombre_categoria, descripcion){
        const result = await pool.query(
            'UPDATE categories SET nombre_categoria = $1, descripcion = $2 WHERE id_categoria = $3 RETURNING * ',
            [nombre_categoria, descripcion, id_categoria]
        );

        return result.rows[0] || null;
    },

    // Elimina una categoría por ID.
    async remove(id_categoria) {

        // Elimina el registro y devuelve el registro eliminado.
        const result = await pool.query(
        'DELETE FROM categories WHERE id_categoria = $1 RETURNING *',
        [id_categoria]
        );

        return result.rows[0] || null;
    }
};

// Exportamos el modelo para usarlo
export default CategoryModel;

