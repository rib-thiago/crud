const {MongoClient, ObjectId} = require("mongodb");
async function connect(){
    if(global.db) return global.db;
    const conn = await MongoClient.connect("mongodb://localhost:27017/");
    if (!conn) return new Error("Can't connect");
    global.db = await conn.db("workshop");
    return global.db;
}

async function findAll(){
    const db = await connect();
    return db.collection("costumers").find().toArray();
}

async function insert(costumer){
    const db = await connect();
    return db.collection("costumers").insertOne(costumer);
}

async function findOne(id){
    const db = await connect();
    const objId = new ObjectId(id);
    return db.collection("costumers").findOne(objId);
}

async function update(id, costumer){
    const filter = {_id: new ObjectId(id)};
    const db = await connect();
    return db.collection("costumers").updateOne(filter, {$set: costumer});
}

async function deleteOne(id){
    const db = await connect();
    const filter = {_id: new ObjectId(id)};
    return db.collection("costumers").deleteOne(filter);
}



module.exports = {findAll, insert, findOne, update, deleteOne}