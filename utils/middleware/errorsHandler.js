const boom = require('boom');
const debug = require('debug')('app:error');
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi');
const config = require('../../config');

// Helper para asignar el stack (propiedad que viene el objeto error) al err boom
function withErrorStack(err, stack) {
   if (config.env === 'development') {
      // Asignamos stack al objeto error || Object.assign({}, err, stack) otra manera
      return {...err, stack};
   } else {
      return err
   }
}

const logError = (err, req, res, next) => {
   debug(err);
   next(err);
}

const wrapErrors = (err, req, res, next) => {
   // Asignamos boom como error, para usar sus métodos
   if(!err.isBoom) {
      next(boom.badImplementation(err));
   }

   next(err);
}

const errorHandler = (err, req, res, next) => {

   const {
      output: { statusCode, payload }
   } = err;
   if(isRequestAjaxOrApi(req) || res.headersSent) {
      // Asignamos el stack cuando no va directo al navegador, así lo puede manejar el frontend
      res.status(statusCode).json(withErrorStack(payload, err.stack));
   } else {
      next(err)
   }
}

module.exports = {
   logError,
   wrapErrors,
   errorHandler
}