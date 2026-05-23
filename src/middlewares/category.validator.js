// Importa la función body desde express-validator
import { body } from 'express-validator';

// ==================================
// VALIDACIONES PARA CREAR CATEGORY
// ==================================
export const createCategoryValidator = [
    body('category_name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters')
];

// =======================================
// VALIDACIONES PARA ACTUALIZAR CATEGORY
// =======================================
export const updateCategoryValidator = [
    body('category_name')
        .optional()
        .trim()
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters')
];
