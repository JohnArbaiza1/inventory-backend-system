import { Router } from "express";
import ProductsController from "../controllers/products.controller.js";
import { createProductValidator, updateProductValidator } from '../middlewares/products.validator.js';
import validateData from "../middlewares/validate.middleware.js";

const router = Router();

// ======================
// PRODUCTS ROUTES
// ======================

router.get('/', ProductsController.getAllProducts);
router.get('/:product_id', ProductsController.getProductById);

router.post(
    '/',
    createProductValidator,
    validateData,
    ProductsController.createProduct
);

router.put(
    '/:product_id',
    updateProductValidator,
    validateData,
    ProductsController.updateProduct
);

router.delete('/:product_id', ProductsController.deleteProduct);

export default router;