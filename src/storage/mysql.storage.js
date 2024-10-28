import pool from '../../db.configs';

class MySQLStorage {
  static async init() {
    try {
      // Get a connection from the pool and test it
      const connection = await pool.getConnection();
      console.log('MySQL Database connected successfully');
      connection.release(); // Release the connection back to the pool
    } catch (error) {
      console.error('Failed to initialize MySQL database connection:', error);
      throw new Error('MySQL database initialization failed');
    }
  }
}

export default MySQLStorage;
