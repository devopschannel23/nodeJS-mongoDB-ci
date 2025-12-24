import { MongoClient } from 'mongodb';

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

//const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;
const uri = `mongodb://${dbUser}:${dbPassword}@${clusterAddress}:27017/${dbName}authSource=admin`;

const client = new MongoClient(uri);


console.log('Hang On! Connecting to your DB...');

try {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log('Connected to your DB Server');
} catch (error) {
  console.log('Oops! Connection failed.');
  await client.close();
  console.log('See you soon! Connection closed.');
}

const database = client.db(dbName);

export default database;
