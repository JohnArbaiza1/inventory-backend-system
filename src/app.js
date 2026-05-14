//Importamos express
import express from 'express'

// Creamos uns instancia de la app de express
const app = express();

// Middleware que permite recibir JSON en el body de las peticiones
app.use(express.json());

// Definimos una ruta GET para verificar el estado del sistema
app.get('/health', (req, res) =>{
    res.json( {status: 'ok'});
});

// Exporta la aplicación para poder usarla en server.jS
module.exports = app;