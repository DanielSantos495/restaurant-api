const boom = require('boom');

// Validamos el schema, estos devuelve un error si no esta bien, si esta bien no devuelve nada
const validate = (data, schema) => {
   const { error } = schema.validate(data);
   return error;
}

// Por defecto buscamos la data en el body del request, pero podemos cambiarlo pasando el parémtro check
const schemaValidation = (schema, check = 'body') => {
   return (req, res, next) => {
      const error = validate(req[check], schema);
      error ? next(boom.badRequest(error)) : next();
   }
}

module.exports = schemaValidation;