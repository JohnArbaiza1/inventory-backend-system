// importamos el modelo de categories
import CategoryModel from "../models/category.model.js";

// Objeto controlador que maneja las peticiones relacionadas con categories
const CategoryController = {

    // obtenemos todas las categories
    async getAllCategories(req, res) {
        try {
            const categories = await CategoryModel.findAll();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // obtenemos la category por id
    async getCategoryById(req, res) {
        try {
            const category = await CategoryModel.findById(req.params.category_id);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Crea una nueva category
    async create(req, res) {
        try {
            const { category_name, description } = req.body;
            const category = await CategoryModel.createCategory(category_name, description);
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Actualiza una category existente
    async update(req, res) {
        try {
            const { category_name, description } = req.body;
            const category = await CategoryModel.updateCategory(
                req.params.category_id,
                category_name,
                description
            );
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Elimina una category por ID
    async remove(req, res) {
        try {
            const category = await CategoryModel.remove(req.params.category_id);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export default CategoryController;