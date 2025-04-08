// const {MongoClient} =require('mongodb');
// const url='mongodb://localhost:27017';
// const database='easyfind-backend'

// const client= new MongoClient(url);

//  async function dbConnect(){
//     let result =await client.connect();
//     let db =result.db(database);
//     return db.collection('users');
 
// }
// module.exports= dbConnect;

require('dotenv').config();
const { MongoClient } = require('mongodb');

let cachedClient = null;
const url = process.env.MONGODB_URI;
const database = 'easyfind';

async function dbConnect() {
    if (cachedClient) {
        return cachedClient;
    }
    const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    await client.connect();
    cachedClient = client.db(database).collection("users");
    return cachedClient;
}

module.exports = dbConnect;
