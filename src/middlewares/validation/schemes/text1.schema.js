// NPM modules
import Joi from 'joi';

const Text1Schema = {
  textSchema: {
    body: Joi.object({
      title: Joi.string().min(3).max(55).required(),
      text: Joi.string().min(3).required(),
      subtitle1: Joi.string().min(3),
      subtitle2: Joi.string().min(3)

    })
  }
};

export default Text1Schema;
