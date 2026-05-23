import { Router } from "express";
import ProductsController from "../controllers/products.controller.js";
import { createProductValidator, updateProductValidator} from '../middlewares/products.validator.js'
import validateData from "../middlewares/validate.middleware.js";

const router = Router();

// ======================
// PRODUCTS ROUTES
// ======================

router.get('/', ProductsController.getAllProducts);

router.get('/:id_product', ProductsController.getProductById);

router.post(
    '/',
    createProductValidator,
    validateData,
    ProductsController.createProduct
);

router.put(
    '/:id_product',
    updateProductValidator,
    validateData,
    ProductsController.updateProduct
);

router.delete('/:id_product', ProductsController.deleteProduct);

export default router;