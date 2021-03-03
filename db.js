const MongoClient = require('mongodb').MongoClient;
require("dotenv").config();
const mongoUri = process.env.MONGO_URI;
const mongoDbName = process.env.MONGO_DB_NAME;

var Client;
var DB;

async function connectMongo() {
    Client = await MongoClient.connect(mongoUri, { useUnifiedTopology: true });
    DB = Client.db(mongoDbName);
}

function getDB() {return DB;}
function getMongoClient() {return Client;}

module.exports = {
    connectMongo,
    getDB,
    getMongoClient
};
