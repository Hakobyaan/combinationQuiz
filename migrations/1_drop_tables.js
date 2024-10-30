import pool from '../db.configs';

async function dropTables() {
  let connection;
  try {
    connection = await pool.getConnection();

    // Temporarily disable foreign key checks
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');

    // Drop tables individually
    await connection.query('DROP TABLE IF EXISTS combination_items');
    await connection.query('DROP TABLE IF EXISTS items');
    await connection.query('DROP TABLE IF EXISTS combinations');
    await connection.query('DROP TABLE IF EXISTS responses');

    console.log('Successfully dropped all tables.');
  } catch (error) {
    console.error('Error dropping tables:', error.message);
  } finally {
    if (connection) {
      // Re-enable foreign key checks
      await connection.query('SET FOREIGN_KEY_CHECKS = 1');
      connection.release();
    }
  }
}

dropTables();
