const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MongoLib = require('../../store/mongo');
const UsersService = require('../users/controller');
const encrypterPassword = require('../../utils/encrypterPassword');
const config = require('../../config');

const usersService = new UsersService();

class AuthService {
   constructor() {
      this.collection = 'auth';
      this.mongoDB = new MongoLib();
   }


   async registerUser({ userAuth }) {
      const user = await encrypterPassword(userAuth);
      const createdUserId = await this.mongoDB.create(this.collection, user);
      delete user.password;
      await usersService.createUser({ user })

      return createdUserId;
   }

   async loginUser({ user }) {
      const userInDb = await this.mongoDB.query(this.collection, user);
      const correctPassword = await bcrypt.compare(user.password, userInDb.password);

      if (correctPassword) {
         delete userInDb.password;
         // Retornamos el JWT
         return jwt.sign(userInDb, config.authJwtSecret, {
            expiresIn: '15min'
         })
      } else {
         throw new Error('Invalid data');
      }

   }

}

module.exports = AuthService;