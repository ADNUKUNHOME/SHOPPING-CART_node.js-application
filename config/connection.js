

const {MongoClient} = require("mongodb");

module.exports.connectToDb = async () => {
  try { 

    const conn = await new MongoClient('mongodb://localhost:27017');
    const db = conn.db('shopping');
    console.log("Connected to mongodb");
    return {conn, db};

  } catch (error) {

    console.log('Error connecting to db', error);
    throw error;

  }
};
