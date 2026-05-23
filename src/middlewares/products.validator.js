import { body } from 'express-validator';

export const createProductValidator = [

    body('product_name')
        .trim()
        .notEmpty().withMessage('Product name is required')
        .isLength({ min: 2, max: 250 })
        .withMessage('Product name must be between 2 and 250 characters'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Description max 1000 characters'),

    body('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({ min: 0.01 })
        .withMessage('Price must be greater than 0'),

    body('stock')
        .notEmpty().withMessage('Stock is required')
        .isInt({ min: 0 })
        .withMessage('Stock must be 0 or greater'),

    body('category_id')
        .notEmpty().withMessage('Category is required')
        .isInt()
        .withMessage('Category must be a valid ID'),

    body('supplier_id')
        .notEmpty().withMessage('Supplier is required')
        .isInt()
        .withMessage('Supplier must be a valid ID')
];

export const updateProductValidator = [

    body('product_name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 250 }),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 1000 }),

    body('price')
        .optional()
        .isFloat({ min: 0.01 }),

    body('stock')
        .optional()
        .isInt({ min: 0 }),

    body('category_id')
        .optional()
        .isInt(),

    body('supplier_id')
        .optional()
        .isInt()
];