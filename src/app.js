// Importamos Express
import express from 'express';

// Middleware que agrega cabeceras de seguridad HTTP
import helmet from 'helmet';

// Middleware para limitar la cantidad de peticiones por IP
import { rateLimit } from 'express-rate-limit';

// Pool de conexión a la base de datos
import pool from './config/db.js';

// Importación de rutas de la aplicación
import categoryRoutes from './routes/category.routes.js';
import supplierRoutes from './routes/supplier.routes.js';
import productsRoutes from './routes/products.routes.js';

// Middleware para manejo global de errores
import errorHandler from './middlewares/error.middleware.js';

// Dependencias para mostrar documentación Swagger
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

// Utilidades para manejar rutas de archivos
import path from 'path';
import { fileURLToPath } from 'url';

// Obtiene la ruta absoluta del archivo actual (equivalente a __filename en CommonJS)
const __filename = fileURLToPath(import.meta.url);

// Obtiene el directorio donde se encuentra el archivo actual
const __dirname = path.dirname(__filename);

// Carga el archivo Swagger
const swaggerDocument = YAML.load(
    path.join(__dirname, '../docs/swagger.yaml')
);

// Creamos una instancia de Express
const app = express();

// ─────────────────────────────────────
// SEGURIDAD
// ─────────────────────────────────────

// Agrega headers de seguridad HTTP
app.use(helmet());

// Limita peticiones por IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // ventana de 15 minutos
    max: 100, // máximo 100 requests por ventana
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: {
        message: 'Too many requests, please try again later.',
        status: 429
        }
    }
});

app.use('/api', limiter);

// ─────────────────────────────────────
// SWAGGER
// ─────────────────────────────────────

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

// ─────────────────────────────────────
// MIDDLEWARES
// ─────────────────────────────────────

// Permite recibir JSON en el body de las peticiones
app.use(express.json());

// ─────────────────────────────────────
// RUTAS
// ─────────────────────────────────────

app.use('/api/categories', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productsRoutes);

// ─────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────

app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({
        status: 'ok',
        database: 'connected'
        });
    } catch (error) {
        res.status(503).json({
        status: 'error',
        database: 'disconnected'
        });
    }
});

// ─────────────────────────────────────
// MANEJO DE ERRORES
// ─────────────────────────────────────

app.use(errorHandler);

// Exporta la aplicación para usarla en server.js
export default app;