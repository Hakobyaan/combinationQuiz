import { Text1Schemes } from './schemes';
import ValidatorUtil from './util/validator.util';

class Text1Validation {
  static validateTextArgs(req, res, next) {
    ValidatorUtil.validateArgs(req, Text1Schemes.textSchema, next);
  }
}

export default Text1Validation;
