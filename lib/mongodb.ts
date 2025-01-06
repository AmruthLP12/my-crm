import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let mongoClient: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    mongoClient = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = mongoClient.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  mongoClient = new MongoClient(uri, options)
  clientPromise = mongoClient.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

// Set up mongoose connection
mongoose.connect(uri).then(() => console.log('Mongoose connected'))
  .catch(err => console.error('Mongoose connection error:', err))

export { mongoose }

