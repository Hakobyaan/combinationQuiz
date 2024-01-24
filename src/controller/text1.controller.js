// Local Modules
import { Text1Service } from '../services';
import { SuccessHandlerUtil } from '../utils';

export default class Text1Controller {
  static async getText(req, res, next) {
    try {
      const users = await Text1Service.getText();

      SuccessHandlerUtil.handleList(res, next, users);
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const {
        text, title, subtitle1, subtitle2
      } = req.body;
      const user = await Text1Service.add({
        text, title, subtitle1, subtitle2
      });
      SuccessHandlerUtil.handleAdd(res, next, user);
    } catch (error) {
      next(error);
    }
  }

  static async edit(req, res, next) {
    try {
      const { id } = req.params;
      const {
        text, title, subtitle1, subtitle2
      } = req.body;
      const editedUser = await Text1Service.edit(id, {
        text, title, subtitle1, subtitle2
      });

      SuccessHandlerUtil.handleUpdate(res, next, editedUser);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedUser = await Text1Service.delete(id);

      SuccessHandlerUtil.handleGet(res, next, deletedUser);
    } catch (error) {
      next(error);
    }
  }
}
