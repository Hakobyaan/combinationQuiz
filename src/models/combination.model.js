import pool from '../../db.configs';

class CombinationModel {
  static async createResponse() {
    const [result] = await pool.query('INSERT INTO responses (created_at) VALUES (NOW())');
    return result.insertId;
  }

  static async createItems(items, responseId) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      for (const item of items) {
        await connection.query(
          'INSERT INTO items (item_value, response_id) VALUES (?, ?)',
          [item, responseId]
        );
      }
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async createCombinations(combinations, responseId) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      if (!Array.isArray(combinations)) {
        throw new Error('Invalid combinations input: Expected an array.');
      }

      for (const combo of combinations) {
        if (!Array.isArray(combo)) {
          console.error('Invalid combo:', combo); 
          continue; 
        }

        const [comboResult] = await connection.query(
          'INSERT INTO combinations (combination_value, response_id) VALUES (?, ?)',
          [combo.join(','), responseId]
        );

        const comboId = comboResult.insertId;

        for (const item of combo) {
          const [itemResult] = await connection.query(
            'SELECT id FROM items WHERE item_value = ? AND response_id = ?',
            [item, responseId]
          );
          
          if (itemResult.length === 0) {
            console.error(`Item ${item} not found for response ID ${responseId}`);
            continue; 
          }

          await connection.query(
            'INSERT INTO combination_items (combination_id, item_id) VALUES (?, ?)',
            [comboId, itemResult[0].id]
          );
        }
      }
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default CombinationModel;
