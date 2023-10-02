const { MongoClient } = require('mongodb');
var config = require('./config');

async function main() {
  const uri = config.mongoUri;
  const client = new MongoClient(uri);

  try {
    await client.connect();

    await findTodoByDescription(client, "Test Todo");
    await findAllTodos(client);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

/**
 * Print a todo by description
 * Note: If more than one todo has the same name, only the first todo the database finds will be printed.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {String} todoDescription The description of the todo you want to find
 */
async function findTodoByDescription(client, todoDescription) {
  const result = await client
    .db(config.database)
    .collection("todos")
    .findOne({ description: todoDescription });

  if (result) {
    console.log(
      `Found a listing in the collection with the name '${todoDescription}':`
    );
    console.log(result);
  } else {
    console.log(`No listings found with the name '${todoDescription}'`);
  }
}

/**
 * Print all todos
 * Results will be limited to the designated maximum number of results.
 * Results will be sorted by the date of the last update in descending order.
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 */
async function findAllTodos(client) {
  const cursor = await client.db(config.database).collection("todos").find();
  while (await cursor.hasNext()) {
    console.log(await cursor.next());
  }
}

