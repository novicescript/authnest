import pg from "pg";

const { Client, Pool } = pg;

class PostgreSQLAdapter {
  constructor(connectionString) {
    this.connectionString = connectionString;
    this.pool = new Pool({ connectionString });
  }

  async connect() {}

  async disconnect() {
    await this.pool.end();
  }

  async createUser(userData) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(
        "INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *",
        [userData.email, userData.password, userData.username]
      );
      return result.rows[0].id;
    } finally {
      client.release();
    }
  }

  async getUserByEmail(email) {
    const client = await this.pool.connect();

    try {
      const result = await client.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}

export default PostgreSQLAdapter;
