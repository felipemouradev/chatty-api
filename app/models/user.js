const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require('./base_model');
const _ = require('lodash');
const TimestampPlugin = require('./plugins/timestamp');

const messageInvalidParameters = 'The user object is bad formatted, missing attributes or has invalid values.';
const UserSchema = new Schema({
  budget: {type: Number, default: 10},
  name: {
    type: String,
    required: [true, messageInvalidParameters]
  },
  username: {
    type: String,
    required: [true, messageInvalidParameters],
    unique: true,
    validate: {
      validator: (v) => /^[a-z][a-z_\.\-0-9]*$/.test(v),
      message: messageInvalidParameters
    }
  },
  createdAt: {type: Date},
  updatedAt: {type: Date}
}, {collection: "user", versionKey: false});

mongoose.Promise = require('bluebird');

UserSchema.loadClass(BaseModel);
UserSchema.plugin(TimestampPlugin);


const User = mongoose.model('user', UserSchema);

module.exports = User;
