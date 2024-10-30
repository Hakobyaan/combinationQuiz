import { CombinationsService } from '../services';
import ErrorsUtil from '../utils/errors.util';

class CombinationController {
  static async generate(req, res) {
    const { items, length } = req.body;
    if (!Array.isArray(items) || typeof length !== 'number') {
      const error = new ErrorsUtil.InputValidationError('Invalid input format', 400);
      return res.status(error.status).json({ error: error.message });
    }
//debug i hamar
    try {
      const response = await CombinationsService.saveCombinations(items, length);

      if (!response || !response.combination || response.combination.length === 0) {
        return res.status(404).json({ error: 'No combinations found' });
      }
      return res.status(200).json(response);
    } catch (error) {
      console.error('Error generating combinations:', error);

      if (error instanceof ErrorsUtil.ConflictError) {
        return res.status(409).json({ error: error.message });
      }

      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default CombinationController;
