const mongoose = require('mongoose');

// Import all models to register them
const models = require('../models');

class DatabaseHelper {
  static async connectDB(uri) {
    try {
      await mongoose.connect(uri, {
        maxPoolSize: 50,
        wtimeoutMS: 2500
      });
      console.log('✅ Database connected successfully');
      return true;
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }
  }

  static async disconnectDB() {
    try {
      await mongoose.disconnect();
      console.log('📴 Database disconnected successfully');
      return true;
    } catch (error) {
      console.error('❌ Database disconnection failed:', error.message);
      return false;
    }
  }

  static getConnectionState() {
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting', 
      3: 'disconnecting'
    };
    return states[mongoose.connection.readyState];
  }

  static async clearDatabase() {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('Can only clear database in test environment');
    }
    
    try {
      const collections = mongoose.connection.collections;
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
      }
      console.log('🧹 Database cleared successfully');
      return true;
    } catch (error) {
      console.error('❌ Database clear failed:', error.message);
      return false;
    }
  }

  static async dropDatabase() {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('Can only drop database in test environment');
    }
    
    try {
      await mongoose.connection.dropDatabase();
      console.log('🗑️ Database dropped successfully');
      return true;
    } catch (error) {
      console.error('❌ Database drop failed:', error.message);
      return false;
    }
  }

  // Get all registered models
  static getModels() {
    return models;
  }

  // Check if a model exists
  static modelExists(modelName) {
    return mongoose.models[modelName] !== undefined;
  }

  // Get model by name
  static getModel(modelName) {
    return mongoose.models[modelName];
  }
}

module.exports = DatabaseHelper;
