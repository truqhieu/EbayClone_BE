const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connect();
  }

  // Connect to MongoDB
  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose.connect(process.env.DEV_MONGODB_URI , {
      maxPoolSize: 50,
      wtimeoutMS: 2500
    }).then(() => {
      console.log('✅ MongoDB Connected Successfully');
    }).catch(err => {
      console.error('❌ MongoDB Connection Failed:', err.message);
      process.exit(1);
    });

    // Handle connection events
    mongoose.connection.on('connected', () => {
      console.log('📡 Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('🚨 Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('📴 Mongoose disconnected from MongoDB');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed through app termination');
      process.exit(0);
    });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
