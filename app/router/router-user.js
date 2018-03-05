const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const CONSTANTS = require('../../config/constants');

module.exports = (app) => {
  app.use(CONSTANTS.APPLICATION.BASE_URL + 'users', router);
};

const User = new UserController();
//Disabled not specified
// router.get('/', User._index);
router.get('/:id', User.findUser);
router.post('/', User._save);
//Disabled not specified
// router.put('/:id', User._update);
//Disabled not specified
// router.delete('/:id', User._remove);
