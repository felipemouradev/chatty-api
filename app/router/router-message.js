const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/message');
const CONSTANTS = require('../../config/constants');

module.exports = (app) => {
  app.use(CONSTANTS.APPLICATION.BASE_URL, router);
};

const Message = new MessageController();
router.get('/messages', Message.findMessagesByTo);
router.post('/messages', Message.saveMessage);
router.get('/message/:id', Message._findOne);
//Disabled not specified
// router.put('/messages/:id', Message._update);
//Disabled not specified
// router.delete('/messages/:id', Message._remove);
