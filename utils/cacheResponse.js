const config = require('../config');

const cacheResponse = (res, seconds) => {
   if(config.env === 'production') {
      // Configuramos para que haya cache y le decimos en segundos cuanto durar
      res.set('Cache-Control', `public, max-age=${seconds}`);
   }
}

module.exports = cacheResponse;