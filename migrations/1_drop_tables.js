import pool from '../db.configs';

async function dropTables() {
  let connection;
  try {
    connection = await pool.getConnection();

    const dropSQL = `
      DROP TABLE IF EXISTS responses;
      DROP TABLE IF EXISTS combinations;
      DROP TABLE IF EXISTS items;
    `;

    await connection.query(dropSQL);
    console.log('Successfully dropped all tables.');
  } catch (error) {
    console.error('Error dropping tables:', error.message);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

dropTables();
