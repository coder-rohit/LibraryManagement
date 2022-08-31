const {MongoClient} = require('mongodb')
const databaseName = "liberary_management"

db_URL = "mongodb://localhost:27017"

const client = new MongoClient(db_URL)

module.exports = async function connectToDB(collectionName){
    await client.connect()
    const db = client.db(databaseName)
    const connection = db.collection(collectionName)
    return connection
}