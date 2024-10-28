/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import pool from '../../db.configs';

class CombinationModel {
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM combinations WHERE id = ?', [id]);
    return rows[0];
  }

  static async createCombination(combination) {
    const [result] = await pool.query('INSERT INTO combinations (combination) VALUES (?)', [combination]);
    return result.insertId;
  }

  static async updateCombination(id, newCombination) {
    const [result] = await pool.query(
      'UPDATE combinations SET combination = ? WHERE id = ?',
      [newCombination, id]
    );
    return result.affectedRows > 0;
  }

  static async deleteCombination(id) {
    const [result] = await pool.query('DELETE FROM combinations WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM combinations');
    return rows;
  }

  static async createMultiple(combinations) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const combinationIds = [];
      for (const combo of combinations) {
        const [result] = await connection
          .query('INSERT INTO combinations (combination) VALUES (?)', [combo]);
        combinationIds.push(result.insertId);
      }

      await connection.commit();
      return combinationIds;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default CombinationModel;
