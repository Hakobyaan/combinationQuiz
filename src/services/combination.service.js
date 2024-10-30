import {CombinationModel} from '../models';
import ErrorsUtil from '../utils/errors.util';

class CombinationsService {
  static generateCombinations(items, length) {
    console.log('Input items:', items);
    console.log('Combination length:', length);
  
    const combinations = [];
  
    function backtrack(start, combo) {
      if (combo.length === length) {
        combinations.push([...combo]);
        return;
      }
  
      if (combo.length + (items.length - start) < length) return;
  
      for (let i = start; i < items.length; i += 1) {
        combo.push(items[i]);
        backtrack(i + 1, combo);
        combo.pop();
      }
    }
  
    backtrack(0, []);
  
    console.log('Generated combinations:', combinations);
    return combinations;
  }
  
  
  static async saveCombinations(items, length) {
    const combinations = this.generateCombinations(items, length);
    
    if (!Array.isArray(combinations)) {
      console.error('Expected an array of combinations');
      throw new ErrorsUtil.ConflictError('Failed to generate combinations');
    }
  
    const responseId = await CombinationModel.createResponse();
  
    try {
      await CombinationModel.createItems(items, responseId);
      await CombinationModel.createCombinations(combinations, responseId);
      return { id: responseId, combination: combinations };
    } catch (error) {
      console.error("Original error in saveCombinations:", error);
      throw new ErrorsUtil.ConflictError('Failed to save combinations');
    }
  }
  
}

export default CombinationsService;
