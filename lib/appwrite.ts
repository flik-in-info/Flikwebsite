import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite API endpoint
  .setProject("67b62ed30029ad7318f3"); // Replace with your Appwrite Project ID

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { client, account, databases, storage };
