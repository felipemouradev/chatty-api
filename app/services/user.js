const _ = require('lodash');
const User = require('./../models/user');
const UserService =  {
  getUser: async (user_id) => {
    return await User.findOne({_id: user_id});
  },

  checkUserBudgetAvailable: async (user) => {
    if(user) {
      return user.budget - 1 >= 0
    }
    return false;
  },

  budgetDeduct: async (user) => {
    user.budget = user.budget-1;
    console.log(user.budget);
    return await user.save();
  }
};

module.exports = UserService;
