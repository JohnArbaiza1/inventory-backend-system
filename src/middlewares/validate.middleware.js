// Importamos la función validationResult desde express-validator
import { validationResult } from "express-validator";

// Middleware encargado de la validacion de los datos de las peticiones
const validateData = (req, res, next) =>{

    //obtiene los errores encontrados en la request
    const errors = validationResult(req);

    // Verifica si existen errores en la validacion
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: {
                message: 'Validation failed',
                status: 400,

                // Lista detallada de errores encontrados
                details: errors.array().map(err => ({

                // Campo que falló en la validación
                field: err.path,

                // Mensaje descriptivo del error
                message: err.msg
                }))
            }
        });
    };

    // Si no hay errores, continúa con el siguiente middleware/controlador
    next();    
}

export default validateData;