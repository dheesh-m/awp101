import { MongoClient, type Collection, type MongoClientOptions } from "mongodb";

export type BookingDocument = {
  _id?: string;
  movieTitle: string;
  showDate: string;
  showTime: string;
  screen: string;
  seats: string[];
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: Date;
};

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "awp-mini-proj";

// Optimized for Vercel serverless: use globalThis for connection reuse across invocations
declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | null;
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | null;
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable. Please add it to your Vercel environment variables or .env.local file.");
}

// Optimized connection options for Vercel serverless
const options: MongoClientOptions = {
  maxPoolSize: 1, // Smaller pool for serverless (1 connection per instance)
  minPoolSize: 1,
  serverSelectionTimeoutMS: 5000, // Faster timeout for serverless
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000, // Faster connection for cold starts
  retryWrites: true,
  retryReads: true,
  // Optimize for serverless
  directConnection: false,
  // Reduce connection overhead
  compressors: ["zlib"],
};

if (process.env.NODE_ENV === "production") {
  // In production (Vercel), use global to persist across function invocations
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().then((client) => {
      return client;
    }).catch((error) => {
      global._mongoClientPromise = null;
      const errorMsg = error.message || String(error);
      if (errorMsg.includes("authentication") || errorMsg.includes("credentials")) {
        throw new Error(`MongoDB authentication failed. Check your username and password.`);
      } else if (errorMsg.includes("ENOTFOUND") || errorMsg.includes("getaddrinfo")) {
        throw new Error(`Cannot reach MongoDB server. Check your network and cluster address.`);
      } else if (errorMsg.includes("timeout")) {
        throw new Error(`Connection timeout. Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for Vercel).`);
      }
      throw new Error(`MongoDB connection failed: ${errorMsg}`);
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In development, create a new client each time
  if (!clientPromise) {
    const client = new MongoClient(uri, options);
    clientPromise = client.connect().catch((error) => {
      clientPromise = null;
      throw error;
    });
  }
}

async function getClient(): Promise<MongoClient> {
  if (!clientPromise) {
    const newClient = new MongoClient(uri!, options);
    clientPromise = newClient.connect();
  }
  
  try {
    return await clientPromise;
  } catch (error: any) {
    // Reset on error for retry
    if (process.env.NODE_ENV === "production") {
      global._mongoClientPromise = null;
    } else {
      clientPromise = null;
    }
    throw error;
  }
}

// Index creation flag (persists across invocations in production)
declare global {
  // eslint-disable-next-line no-var
  var _mongoIndexCreated: boolean | undefined;
}

export async function getBookingsCollection(): Promise<Collection<BookingDocument>> {
  try {
    const client = await getClient();
    const db = client.db(dbName);
    const collection = db.collection<BookingDocument>("bookings");
    
    // Create index only once (optimized for serverless - uses global flag)
    const indexCreated = process.env.NODE_ENV === "production" 
      ? global._mongoIndexCreated 
      : false;
    
    if (!indexCreated) {
      try {
        await collection.createIndex({ createdAt: -1 }, { background: true });
        if (process.env.NODE_ENV === "production") {
          global._mongoIndexCreated = true;
        }
      } catch (error: any) {
        // Index might already exist, that's okay
        if (!error.message?.includes("already exists") && !error.message?.includes("IndexOptionsConflict")) {
          console.warn("Index creation warning:", error.message);
        }
        if (process.env.NODE_ENV === "production") {
          global._mongoIndexCreated = true; // Mark as attempted
        }
      }
    }
    
    return collection;
  } catch (error: any) {
    console.error("MongoDB collection error:", error);
    throw new Error(`Database operation failed: ${error.message || "Unknown error"}`);
  }
}

