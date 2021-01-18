const { MongoClient, ObjectId } = require('mongodb');
const config = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}>?retryWrites=true&w=majority`;

class MongoLib {
   constructor() {
      this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
      this.dbName = DB_NAME;
   }

   async connect() {
      if (!MongoLib.connection) {
         try {
            await this.client.connect();
            console.log('Connected successfuly to mongo');
            MongoLib.connection = this.client.db(this.dbName);
         } catch(err) {
            console.error(err);
         }
      }

      return MongoLib.connection;
   }

   getAll(collection) {
      return this.connect()
         .then(db => {
            return db.collection(collection).find().toArray();
         })
         .catch(console.err);
   }

   get(collection, id) {
      return this.connect()
         .then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id) });
         })
         .catch(console.err);
   }

   create(collection, data) {
      return this.connect()
         .then(db => {
            return db.collection(collection).insertOne(data);
         })
         .then(result => {
            return result.insertedId
         })
         .catch(console.err);
   }

   update(collection, id, data) {
      return this.connect()
         .then(db => {
            return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
         })
         .then(result => result.insertedId || id)
         .catch(console.err);
   }

   delete(collection, id) {
      return this.connect()
         .then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id) });
         })
         .then(() => id)
         .catch(console.error);
   }

   query(collection, data) {
      return this.connect()
         .then(db => {
            return db.collection(collection).findOne({ username: data.username })
         })
         .catch(console.error)
   }

}

module.exports = MongoLib;