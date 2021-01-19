const withoutStackError = require('../withoutStackErro');

const getData = header => {
   if(!header) {
      withoutStackError('Not credentials', 401);
   }

   if(header.indexOf('Basic ') === -1 ) {
      withoutStackError('Invalid format', 401);
   }

   return header.replace('Basic ', '');
}

const formatData = data => {
   const dataInArray = data.split(':')
   const newFormt = {
      username: dataInArray[0],
      password: dataInArray[1]
   }
   console.log(newFormt);

   return newFormt
}

const decodeHeader = req => {
   const authorization = req.headers.authorization;
   const dataInB64 = getData(authorization);
   const decoded = Buffer.from(dataInB64, 'base64').toString();
   const cleanData = formatData(decoded)

   req.body = cleanData;

   return cleanData;
}

const authValidation = (req, res, next) => {
   decodeHeader(req);
   next();
}

module.exports = authValidation;