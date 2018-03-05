const _ = require('lodash');
const BaseController = require('./base_controller');
const Message = require('../models/message');
const UserService = require('./../services/user');

class MessageController extends BaseController {
  constructor() {
    super(Message);
    this.saveMessage = this.saveMessage.bind(this);
    this.findMessagesByTo = this.findMessagesByTo.bind(this);
  }

  async findMessagesByTo(req, res, next) {
    console.log(req.query);
    if(!req.query.to)
      return this.Response(res, this.HandleError(null, 'The request is missing required attributes.',400));

    const userTo = await UserService.getUser(req.query.to);
    if(userTo) {
      const messages = await Message.find({to: userTo._id});
      return this.Response(res, null, {messages: messages}, 200);
    }
    return this.Response(res, this.HandleError(null, 'The user does not exist.',404));
  }

  async saveMessage(req, res, next) {
    const userTo = await UserService.getUser(req.body.to);
    const userFrom = await UserService.getUser(req.body.from);

    if(userFrom && userTo) {
      if(await UserService.checkUserBudgetAvailable(userFrom)) {
        return await this._save(req, res, next, ()=> {},
          async (message) => {
            console.log("message: ",message);
            message ? await UserService.budgetDeduct(userFrom) : null;
          });
      }
      return this.Response(res, this.HandleError(null, 'User not allowed to send, insufficient budget.'));
    }
    return this.Response(res, this.HandleError(null, 'The recipient or the sender does not exist.',404));
  }
}

module.exports = MessageController;
