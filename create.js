const {MongoClient} = require('mongodb');
var config = require('./config');

async function main() {
  const uri = config.mongoUri;
  const client = new MongoClient(uri);

  try {
    await client.connect();

    await createTodo(client, {
      description: "Test Todo",
      complete: false,
    });
  } finally {
    await client.close();
  }
}

main().catch(console.error);

/**
 * Create a new todo
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the todo collection
 * @param {Object} newTodo The new todo to be added
 */

async function createTodo(client, newTodo) {
  const result = await client.db(config.database).collection("todos").insertOne(newTodo);
  console.log(`New todo created with id ${result.insertedId}`);
}
