import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

if (uri) {
    const globalWithMongo = global as typeof global & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    if (process.env.NODE_ENV === 'development') {
        if (!globalWithMongo._mongoClientPromise) {
            client = new MongoClient(uri);
            globalWithMongo._mongoClientPromise = client.connect();
        }
        clientPromise = globalWithMongo._mongoClientPromise;
    } else {
        client = new MongoClient(uri);
        clientPromise = client.connect();
    }
} else {
    console.warn("MONGODB_URI environment variable is missing. Running in local fallback mode.");
}

export default clientPromise;