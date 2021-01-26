const config = require('../config')

const withoutStackError = (message, status) => {

   const err = new Error(message);
   err.statusCode = status
   console.log(err, 'error')
   if(config.env  === 'development') {
      return err;
   } else {
      delete err.stack;
      return err;
   }
}

module.exports = withoutStackError;