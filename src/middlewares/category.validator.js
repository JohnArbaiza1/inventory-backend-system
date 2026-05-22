// Importa la función body desde express-validator
import { body } from 'express-validator';

// ==================================
// VALIDACIONES PARA CREAR CATEGORÍA
// ==================================

export const createCategoryValidator = [
    //valida el campo nombre_categoria
    body('nombre_categoria')
        .trim()
        .notEmpty().withMessage('Name is required')
        // Verifica que la longitud esté entre 2 y 100 caracteres
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),


    // Valida el campo "descripcion"
    body('descripcion')
        .optional()
        .trim()
        // Verifica que no exceda los 500 caracteres
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters')
];

// =======================================
// VALIDACIONES PARA ACTUALIZAR CATEGORÍA
// =======================================

export const updateCategoryValidator = [
    //valida el campo nombre_categoria
    body('nombre_categoria')
        .optional()
        .trim()
        .notEmpty().withMessage('Name cannot be empty')
        // Verifica longitud mínima y máxima
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),

    // Valida el campo "descripcion"
    body('descripcion')
        .optional()
        // Elimina espacios innecesarios
        .trim()
        // Limita la longitud máxima a 500 caracteres
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters')
];
