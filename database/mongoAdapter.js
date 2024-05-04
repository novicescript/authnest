import { MongoClient } from "mongodb";

class MongoDBAdapter {
  constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
    this.client = null;
    this.db = null;
  }

  async connect() {
    this.client = new MongoClient(this.url);
    await this.client.connect();
    this.db = this.client.db(this.dbName);
  }

  async disconnect() {
    await this.client.close();
  }

  async createUser(userData) {
    try {
      await this.connect();
      if (!this.db) {
        throw new Error("Failed to establish database connection");
      }
      const userCollection = this.db.collection("users");
      const result = await userCollection.insertOne(userData);
      return result.insertedId;
    } catch (err) {
      throw new Error(err.message || "Error creating user");
    } finally {
      await this.disconnect();
    }
  }

  async getUserByEmail(email) {
    await this.connect();
    if (!this.db) {
      throw new Error("Database connection is not established");
    }

    const userCollection = this.db.collection("users");
    const user = await userCollection.findOne({ email });
    return user;
  }
}

export default MongoDBAdapter;
