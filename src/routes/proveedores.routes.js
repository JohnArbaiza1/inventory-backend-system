// Importamos a Router desde Express.
import { Router } from "express";

// Importamos el controlador
import ProveedorController from "../controllers/proveedor.controller.js";

// Importamos los Middlewares
import validateData from "../middlewares/validate.middleware.js";
import { createProveedorValidator, updateProveedorValidator } from "../middlewares/proveedor.validator.js";

// Crea una nueva instancia del enrutador.
const router = Router();

// ==========================
// RUTAS DE PROVEEDORES
// ==========================
router.get('/', ProveedorController.getAllProveedores);
router.get('/:id_proveedor', ProveedorController.getProveedorById);
router.post('/',createProveedorValidator, validateData, ProveedorController.createProveedor);
router.put('/:id_proveedor', updateProveedorValidator, validateData, ProveedorController.updateProveedor);
router.delete('/:id_proveedor', ProveedorController.removeProveedor);

// Exporta las rutas para utilizarlas en la aplicación principal.
export default router;