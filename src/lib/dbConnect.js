import { MongoClient, ServerApiVersion } from 'mongodb';

export default function dbConnect(collectionName) { // প্যারামিটার যোগ করা হয়েছে
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    // সরাসরি কালেকশন রিটার্ন করছে
    return client.db(process.env.DB_NAME).collection(collectionName);
}