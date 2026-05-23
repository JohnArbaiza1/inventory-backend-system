// Importamos a Router desde Express.
import { Router } from "express";

// Importamos el controlador
import SupplierController from "../controllers/supplier.controller.js";

// Importamos los Middlewares
import validateData from "../middlewares/validate.middleware.js";
import { createSupplierValidator, updateSupplierValidator } from "../middlewares/supplier.validator.js";

// Crea una nueva instancia del enrutador.
const router = Router();

// ==========================
// RUTAS DE PROVEEDORES
// ==========================
router.get('/', SupplierController.getAllSuppliers);
router.get('/:supplier_id', SupplierController.getSupplierById);
router.post('/', createSupplierValidator, validateData, SupplierController.createSupplier);
router.put('/:supplier_id', updateSupplierValidator, validateData, SupplierController.updateSupplier);
router.delete('/:supplier_id', SupplierController.removeSupplier);

// Exporta las rutas para utilizarlas en la aplicación principal.
export default router;