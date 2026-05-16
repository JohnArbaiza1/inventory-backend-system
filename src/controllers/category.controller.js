//importamos el modelo de categorias
import CategoryModel from "../models/category.model.js";

//Objeto controlador que maneja las peticiones relacionadas con categorias
const CategoryController = {

    // obtenemos todas las categorias
    async getAllCategories(req, res){
        try {
            // llamamos al modelo para obtener las categorias
            const categories = await CategoryModel.findAll();

            //responde con las categorias en formato JSON
            res.json(categories);
        } catch (error) {
            // Si ocurre un error, responde con estado 500.
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // obtenemos las categorias por el id
    async getCategoriesById(req, res){
        try {
            const category = await CategoryModel.findById(req.params.id_categoria);

            // si no existe la categoria responde con un 404
            if(!category){
                return res.status(404).json({ error: 'Category not found' });
            }

            // Devuelve la categoría encontrada.
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Crea una nueva categoría.
    async create(req, res) {
        try {

        // Extrae name y description desde el body de la petición.
        const { nombre_categoria, descripcion } = req.body;

        // Llama al modelo para crear la categoría.
        const category = await CategoryModel.createCategories(nombre_categoria, descripcion);

        // Responde con código 201 (creado exitosamente).
        res.status(201).json(category);

        } catch (error) {

        // Manejo de errores internos.
        res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Actualiza una categoría existente.
    async update(req, res) {
        try {

        // Obtiene los nuevos datos enviados en la petición.
        const { nombre_categoria, descripcion } = req.body;

        // Llama al modelo para actualizar la categoría.
        const category = await CategoryModel.updateCategories(
            req.params.id_categoria,
            nombre_categoria,
            descripcion
        );

        // Si no existe la categoría, devuelve 404.
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Retorna la categoría actualizada.
        res.json(category);

        } catch (error) {

        // Manejo de errores internos del servidor.
        res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Elimina una categoría por ID.
    async remove(req, res) {
        try {

        // Llama al modelo para eliminar la categoría.
        const category = await CategoryModel.remove(req.params.id_categoria);

        // Si no existe la categoría, devuelve error 404.
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Respuesta exitosa indicando que fue eliminada.
        res.json({ message: 'Category deleted successfully' });

        } catch (error) {

        // Manejo de errores internos.
        res.status(500).json({ error: 'Internal server error' });
        }
    }
};

// Exporta el controlador para usarlo en las rutas.
export default CategoryController;