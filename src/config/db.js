// Importa la clase Pool desde el paquete pg (PostgreSQL para Node.js)
import { Pool } from 'pg';

// Cargamos las variables de entorno
import 'dotenv/config';

// Creamos un pool de conexiones a la db PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,         // Dirección del servidor de la base de datos
    port: process.env.DB_PORT,         // Puerto de la base de datos
    database: process.env.DB_NAME,     // Nombre de la base de datos
    user: process.env.DB_USER,         // Usuario de la base de datos
    password: process.env.DB_PASSWORD, // Contraseña del usuario    
});

//manejo de errores
pool.on('error', (err) =>{
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Exportamos el Pool
export default pool;