

const {MongoClient} = require("mongodb");

const state = {
    db:null
}

module.exports.connectToDb = async () => {
  try { 

    const conn = await new MongoClient('mongodb://localhost:27017');

    state.db = conn.db('shopping');
    console.log("Connected to mongodb");    
   

  } catch (error) {

    console.log('Error connecting to db', error);
    throw error;

  }
};

module.exports.get = () => {
    return state.db;
}
