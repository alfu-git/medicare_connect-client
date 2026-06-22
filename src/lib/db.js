import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectDB() {
  const client = await clientPromise;
  return client.db("medicare-db"); // 👉 এখানে তোর DB name দিবি
}
