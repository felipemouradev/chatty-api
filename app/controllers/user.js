const _ = require('lodash');
const BaseController = require('./base_controller');
const User = require('../models/user');

class UserController extends BaseController {
  constructor() {
    super(User);
    this.findUser = this.findUser.bind(this);
  }

  async findUser(req, res, next) {
    return await this._findOne(req, res, next, null,
      async () => {
        return this.Response(res, this.HandleError(null,'The user was not found.'), 404)
      });
  }
}

module.exports = UserController;
