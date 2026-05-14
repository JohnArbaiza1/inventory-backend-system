// Cargamos las variables de entorno desde el archivo .env
require('dotenv').config();

// importamos la app de express desde app.jS
const app = require('../app');

//Establecemos el puerto a emplear
const PORT = process.env.PORT || 3000;

// Inicia el servidor y lo pone a escuchar en el puerto definido
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});