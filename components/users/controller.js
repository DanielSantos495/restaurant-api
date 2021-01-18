const MongoLib = require('../../store/mongo');

class UsersService {
   constructor() {
      this.collection = 'users';
      this.mongoDB = new MongoLib();
   }

   async getUsers() {
      const users = await this.mongoDB.getAll(this.collection);

      return users || [];
   }

   async getUser({ userId }) {
      const user = await this.mongoDB.get(this.collection, userId);

      return user || [];
   }
   async createUser({ user }) {
      const createdUserId = await this.mongoDB.create(this.collection, user);

      return createdUserId;
   }

   async updateUser({ userId, user}) {
      const updateUserId = await this.mongoDB.update(this.collection, userId, user);

      return updateUserId;
   }

   async deleteUser({ userId }) {
      const deleteUserId = await this.mongoDB.delete(this.collection, userId);

      return deleteUserId || userId
   }
}

module.exports = UsersService;