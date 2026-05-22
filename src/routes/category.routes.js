// Importamos a Router desde Express.
import { Router } from "express";
// Importamos los controladores
import CategoryController from "../controllers/category.controller.js";
// Importamos los Middlewares
import validateData from "../middlewares/validate.middleware.js";
import { createCategoryValidator, updateCategoryValidator } from "../middlewares/category.validator.js";

// Crea una nueva instancia del enrutador.
const router = Router();

// ==========================
// RUTAS DE CATEGORÍAS
// ==========================
router.get('/', CategoryController.getAllCategories);
router.get('/:id_categoria', CategoryController.getCategoriesById);
router.post('/',createCategoryValidator, validateData, CategoryController.create);
router.put('/:id_categoria', updateCategoryValidator, validateData, CategoryController.update);
router.delete('/:id_categoria', CategoryController.remove);

// Exporta las rutas para utilizarlas en la aplicación principal.
export default router;