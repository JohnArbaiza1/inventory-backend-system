//Importamos express
import express from 'express';
import pool from './config/db.js';

// Creamos uns instancia de la app de express
const app = express();

// Middleware que permite recibir JSON en el body de las peticiones
app.use(express.json());

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

// Exporta la aplicación para poder usarla en server.jS
export default app;