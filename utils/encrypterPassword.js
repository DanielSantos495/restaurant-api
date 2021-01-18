const bcrypt = require('bcrypt');

const encrypterPassword = async object => {
   console.log(object.password)
   object.password = await bcrypt.hash(object.password, 10);

   return object;
}

module.exports = encrypterPassword;