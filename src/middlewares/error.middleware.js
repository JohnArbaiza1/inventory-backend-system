// Middleware de manejo global de errores para Express
const errorHandler = (err, req, res, next) =>{
    console.error(err.stack);

    // Obtenemos el codigo de estado del error si existiera de lo contrario usa 500
    const status = err.status || 500;

    //Obtenemos el mensaje de error si existe de loc contrario un mensaje generico
    const message = err.message  ||  'Internal server error';

    // Enviamos la respuesta HTTP en formaro JSON
    res.status(status).json({
        error: {
            message,
            status,
            path: req.originalUrl
        }
    });
};

// Exportamos el middleware
export default errorHandler;