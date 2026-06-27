import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('Please add your MONGODB_URI to .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Next.js development mode mein bar-bar connection na bane, 
// isliye hum 'global' variable use kar rahe hain
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

export default clientPromise;