import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();
const conection_string = process.env.MONGO_URL;
const databaseName = process.env.DBNAME;
const databaseCollection = process.env.COLLECTION;
const client = new MongoClient(conection_string);

export const databaseConnection = async () => {
  try {
    await client.connect();
    console.log("Connected successfully to database".bgGreen.white);
  } catch (error) {
    console.log("error in database connection");
  }
};

export const clientConnection = () => {
  try {
    const db = client.db(databaseName);
    const collection = db.collection(databaseCollection);
    return collection;
  } catch (error) {
    console.log("error in database client connection");
  }
};
