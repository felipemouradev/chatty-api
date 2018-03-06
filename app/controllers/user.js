const _ = require('lodash');
const BaseController = require('./base_controller');
const User = require('../models/user');

class UserController extends BaseController {
  constructor() {
    super(User);
    this.findUser = this.findUser.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  async createUser(res, req, next) {
    return await this._save(req, res, next, ()=> {
      // Se não for omitido o budget o usuario que conhecer o modelo
      // poderia colocar um budget não permitido,
      // caso a intenção seja que o novos usuarios digam qual o seu
      // proprio buget remover o callback inteiro
      req.body = _.omit(req.body, 'bugdet');
    });
  }

  async findUser(req, res, next) {
    return await this._findOne(req, res, next, null,
      async () => {
        return this.Response(res, this.HandleError(null,'The user was not found.'), 404)
      });
  }
}

module.exports = UserController;
