const CONSTANTS = require('../../config/constants');
const ThrowerService = require('../services/thrower');

class BaseModel {

  static async remove(_id = null) {

    let objectForDelete = await this.findOne({_id});

    if (!objectForDelete)
      throw ThrowerService('not found!');

    if (!objectForDelete.is_active)
      throw ThrowerService('This data is already disabled!');

    if (CONSTANTS.MODEL.SOFT_DELETE) {
      objectForDelete.is_active = false;
      return await objectForDelete.save();
    }

    return await objectForDelete.remove({_id});
  }

}

module.exports = BaseModel;
