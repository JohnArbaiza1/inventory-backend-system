//Importamos express
import express from 'express';
import pool from './config/db.js';
import categoryRoutes from './routes/category.routes.js';
import supplierRoutes from './routes/supplier.routes.js'
import productsRoutes from "./routes/products.routes.js";
import errorHandler from './middlewares/error.middleware.js';

// Imports para Swagger
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

// Instancias para el uso de Swagger
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));

// Creamos uns instancia de la app de express
const app = express();

//Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware que permite recibir JSON en el body de las peticiones
app.use(express.json());

// Rutas
app.use('/api/categories', categoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use("/api/products", productsRoutes);

// Definimos una ruta GET para verificar el estado del sistema
app.get('/health', async (req, res) =>{
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
        })
    }
});

app.use(errorHandler);

// Exporta la aplicación para poder usarla en server.jS
export default app;