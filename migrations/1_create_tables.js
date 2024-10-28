import fs from 'fs';
import path from 'path';
import pool from '../db.configs';

async function runMigration() {
  let connection;
  try {
    connection = await pool.getConnection();

    const sql = fs.readFileSync(path.join(__dirname, '1_create_tables.sql'), 'utf8');

    await connection.query(sql);
    console.log('Migration successful: Tables created.');
  } catch (error) {
    console.error('Migration failed:', error.message);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

runMigration();
