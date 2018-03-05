const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require('./base_model');
const _ = require('lodash');

const messageInvalidParameters = 'The request is missing required attributes or the values are invalid. For example, body exceeds max length.';
const MessageSchema = new Schema({
  from: {type: Schema.Types.ObjectId, ref: 'user', required: [true, messageInvalidParameters]},
  to: {type: Schema.Types.ObjectId, ref: 'user', required: [true, messageInvalidParameters]},
  body: {
    type: String,
    required: [true, messageInvalidParameters],
    validate: {
      validator: (v) => v.length < 1 && v.length > 280,
      message: messageInvalidParameters
    }
  },
  sentAt: {type: Date, default: new Date()},
}, {collection: "message", versionKey: false});

mongoose.Promise = require('bluebird');

MessageSchema.loadClass(BaseModel);

const Message = mongoose.model('message', MessageSchema);

module.exports = Message;
