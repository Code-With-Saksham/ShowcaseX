const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_maker';
  try {
    // Attempt standard connection with 3 sec timeout to fail fast if mongod is absent
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[Database] Connected to MongoDB: ${conn.connection.host}`);
  } catch (err) {
    console.log(`[Database] Standard MongoDB connection failed (${err.message}). Launching in-memory database fallback...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const memUri = mongod.getUri();
      const conn = await mongoose.connect(memUri);
      console.log(`[Database] Connected to In-Memory MongoDB at ${memUri}`);
    } catch (memErr) {
      console.error('[Database] Critical: Failed to start MongoDB server:', memErr);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
