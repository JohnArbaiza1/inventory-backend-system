// Importamos a Router desde Express.
import { Router } from "express";
// Importamos los controladores
import CategoryController from "../controllers/category.controller.js";

// Crea una nueva instancia del enrutador.
const router = Router();

// ==========================
// RUTAS DE CATEGORÍAS
// ==========================
router.get('/', CategoryController.getAllCategories);
router.get('/:id_categoria', CategoryController.getCategoriesById);
router.post('/', CategoryController.create);
router.put('/:id_categoria', CategoryController.update);
router.delete('/:id_categoria', CategoryController.remove);

// Exporta las rutas para utilizarlas en la aplicación principal.
export default router;