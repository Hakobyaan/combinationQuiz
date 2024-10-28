import pool from '../../db.configs';
import ErrorsUtil from '../utils/errors.util';

class CombinationsService {
  static generateCombinations(items, length) {
    const combinations = [];

    function backtrack(start, combo) {
      if (combo.length === length) {
        combinations.push([...combo]);
        return;
      }
      for (let i = start; i < items.length; i += 1) {
        // eslint-disable-next-line no-continue
        if (combo.some((c) => c[0] === items[i][0])) continue; // Skip if same prefix
        combo.push(items[i]);
        backtrack(i + 1, combo);
        combo.pop();
      }
    }

    backtrack(0, []);
    return combinations;
  }

  static async saveCombinations(items, length) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Generate combinations
      const combinations = this.generateCombinations(items, length);

      // Example: Saving items in `items` table
      // eslint-disable-next-line no-restricted-syntax
      for (const item of items) {
        // eslint-disable-next-line no-await-in-loop
        await connection.query('INSERT INTO items (item_name) VALUES (?)', [item]);
      }

      // Example response construction
      const response = {
        id: 1, // This can be dynamically set if needed
        combination: combinations
      };

      console.log('Generated Response:', response); // Debugging: Log the response
      await connection.commit();
      return response;
    } catch (error) {
      await connection.rollback();
      throw new ErrorsUtil.ConflictError('Failed to save combinations');
    } finally {
      connection.release();
    }
  }
}

export default CombinationsService;
