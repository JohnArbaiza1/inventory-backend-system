// Importa la función body desde express-validator
import { body } from 'express-validator';

// ====================================
// VALIDACIONES PARA CREAR PROVEEDORES
// ====================================
export const createProveedorValidator = [

    // Valida el campo nombre_proveedor
    body('nombre_proveedor')
        .trim()
        .notEmpty().withMessage('Supplier name is required')
        .isLength({ min: 2, max: 250 })
        .withMessage('Supplier name must be between 2 and 250 characters'),

    // Valida el campo telefono
    body('telefono')
        .trim()
        .notEmpty()
        .custom(value => {
            const clean = value.replace('-', '');

            if (!/^\d{8}$/.test(clean)) {
            throw new Error('Phone must contain 8 digits');
            }

            return true;
    }),

    // Valida el campo email
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')

        // Verifica formato válido de correo
        .isEmail().withMessage('Invalid email format')

        // Normaliza el email (minúsculas, etc.)
        .normalizeEmail(),

    // Valida el campo estado (opcional)
    body('estado')
        .optional()
        .isBoolean()
        .withMessage('Status must be true or false')
];

// =========================================
// VALIDACIONES PARA ACTUALIZAR PROVEEDORES
// =========================================
export const updateProveedorValidator = [

    // Valida nombre_proveedor
    body('nombre_proveedor')
        .optional()
        .trim()
        .notEmpty().withMessage('Supplier name cannot be empty')
        .isLength({ min: 2, max: 250 })
        .withMessage('Supplier name must be between 2 and 250 characters'),

    // Valida telefono
    body('telefono')
        .trim()
        .notEmpty()
        .custom(value => {
            const clean = value.replace('-', '');

            if (!/^\d{8}$/.test(clean)) {
            throw new Error('Phone must contain 8 digits');
            }

            return true;
    }),

    // Valida email
    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),

    // Valida estado
    body('estado')
        .optional()
        .isBoolean()
        .withMessage('Status must be true or false')
];
