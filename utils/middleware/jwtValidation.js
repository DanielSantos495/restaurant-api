const jwt = require('jsonwebtoken');
const boom = require('boom');
const UsersService = require('../../components/users/controller');
const config = require('../../config');
const withoutStackError = require('../withoutStackErro');

const usersService = new UsersService();

// Verificamos si el token esta valido
const verify = token => {
   return jwt.verify(token, config.authJwtSecret)
}

// Sacamos el token de los headers
const getToken = header => {
   if(!header || header.replace('Bearer ', '') === 'null') {
      throw withoutStackError('Not token', 401);
   }
   // Si indexOf es igual a - 1, es que no esta Bearer en el header
   if(header.indexOf('Bearer ') === -1 ) {
      throw withoutStackError('Invalid format', 401);
   }

   const token = header.replace('Bearer ', '');
   return token;
}

const decodeHeader = req => {
   // Sacamos los headers 'authorization del request
   const authorization = req.headers.authorization || '';
   const token = getToken(authorization);
   const decoded = verify(token);

   req.user = decoded;
   return decoded;
}

const jwtValidation = async (req, res, next) => {

   try {
      const data = decodeHeader(req);
      const own = await usersService.getUser({ userId: data._id });
      const userIdBdToString = own._id.toString();

      if(data._id !== userIdBdToString) {
         throw boom.unauthorized();
      }
      // Si son iguales, esta autorizado
      if(data._id === userIdBdToString) {
         next()
      }
   } catch(err) {
      next(err);
   }

}


module.exports = jwtValidation;