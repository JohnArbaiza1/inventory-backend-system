import { body } from 'express-validator';

// ====================================
// VALIDACIONES PARA CREAR SUPPLIER
// ====================================
export const createSupplierValidator = [
    body('supplier_name')
        .trim()
        .notEmpty().withMessage('Supplier name is required')
        .isLength({ min: 2, max: 250 }).withMessage('Supplier name must be between 2 and 250 characters'),

    body('phone')
        .trim()
        .notEmpty()
        .custom(value => {
            const clean = value.replace('-', '');
            if (!/^\d{8}$/.test(clean)) throw new Error('Phone must contain 8 digits');
            return true;
        }),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail()
];

// =========================================
// VALIDACIONES PARA ACTUALIZAR SUPPLIER
// =========================================
export const updateSupplierValidator = [
    body('supplier_name')
        .optional()
        .trim()
        .notEmpty().withMessage('Supplier name cannot be empty')
        .isLength({ min: 2, max: 250 }).withMessage('Supplier name must be between 2 and 250 characters'),

    body('phone')
        .optional()
        .trim()
        .custom(value => {
            const clean = value.replace('-', '');
            if (!/^\d{8}$/.test(clean)) throw new Error('Phone must contain 8 digits');
            return true;
        }),

    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail()
];
