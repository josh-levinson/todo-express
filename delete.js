const { MongoClient } = require('mongodb');
var config = require('./config');

async function main() {
    const uri = config.mongoUri;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        await deleteTodoByDescription(client, "Test Todo");
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Delete a todo by name
 * Note: If more than one todo has the same description, only the first todo the database finds will be deleted.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {string} todoDescription Description of the todo to delete
 */
async function deleteTodoByDescription(client, todoDescription) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#deleteOne for the deleteOne() docs
    const result = await client.db(config.database).collection("todos").deleteOne({ description: todoDescription });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}
