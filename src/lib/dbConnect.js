import { MongoClient, ServerApiVersion } from 'mongodb';

export const collectionsName = {
    servicesCollection: 'services',
    usersCollection: 'users',
};

let db;

export default async function dbConnect(collectionName) {
    if (db) return db.collection(collectionName);

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        db = client.db(process.env.DB_NAME);
        return db.collection(collectionName);
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}