// Local Modules
import { Text1Model } from '../models';

export default class Text1Service {
  static getText() {
    return Text1Model.getText();
  }

  static add(payload) {
    return Text1Model.create(payload);
  }

  static edit(id, update) {
    return Text1Model.edit(id, update);
  }

  static delete(id) {
    return Text1Model.delete(id);
  }
}
