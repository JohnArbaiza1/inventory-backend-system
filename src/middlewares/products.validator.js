import { body } from 'express-validator';

export const createProductValidator = [

    body('nombre_producto')
        .trim()
        .notEmpty().withMessage('Product name is required')
        .isLength({ min: 2, max: 250 })
        .withMessage('Product name must be between 2 and 250 characters'),

    body('descripcion')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Description max 1000 characters'),

    body('precio')
        .notEmpty().withMessage('Price is required')
        .isFloat({ min: 0.01 })
        .withMessage('Price must be greater than 0'),

    body('stock')
        .notEmpty().withMessage('Stock is required')
        .isInt({ min: 0 })
        .withMessage('Stock must be 0 or greater'),

    body('id_categoria')
        .notEmpty().withMessage('Category is required')
        .isInt()
        .withMessage('Category must be a valid ID'),

    body('id_proveedor')
        .notEmpty().withMessage('Supplier is required')
        .isInt()
        .withMessage('Supplier must be a valid ID')
];

export const updateProductValidator = [

    body('nombre_producto')
        .optional()
        .trim()
        .isLength({ min: 2, max: 250 }),

    body('descripcion')
        .optional()
        .trim()
        .isLength({ max: 1000 }),

    body('precio')
        .optional()
        .isFloat({ min: 0.01 }),

    body('stock')
        .optional()
        .isInt({ min: 0 }),

    body('id_categoria')
        .optional()
        .isInt(),

    body('id_proveedor')
        .optional()
        .isInt()
];