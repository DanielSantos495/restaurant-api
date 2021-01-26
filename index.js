const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');
const routes = require('./routes');
const { logError, wrapErrors, errorHandler } = require('./utils/middleware/errorsHandler');

const app = express();

// Middleware
app.use(cors()); //Sin config, para todos los dominios, //Config dominio fijo después de hacer frontend
app.use(helmet()); //Agrega headers de seguridad
app.use(express.json());

// Rutas
routes(app);

app.use(logError);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, (err) => {
   if (err) {
      console.log(err);
   }
   console.log(`Listening in http://localhost:${config.port}`);
});