const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseModel = require('./base_model');
const _ = require('lodash');
const TimestampPlugin = require('./plugins/timestamp');
const HandleErrorService = require('./../services/handle-error');

const UserSchema = new Schema({
  budget: {type: Number, default: 10},
  name: {
    type: String,
    required: [true, 'The user object is bad formatted, missing attributes or has invalid values.']
  },
  username: {
    type: String,
    required: [true, 'The user object is bad formatted, missing attributes or has invalid values.'],
    unique: true,
    validate: {
    validator: function(v) {
      return /^[a-z][a-z_\.\-0-9]*$/.test(v);
    },
    message: 'The user object is bad formatted, missing attributes or has invalid values.'
  }},
  createdAt: {type: Date},
  updatedAt: {type: Date}
}, {collection: "user", versionKey: false});

mongoose.Promise = require('bluebird');

UserSchema.loadClass(BaseModel);
UserSchema.plugin(TimestampPlugin);


const User = mongoose.model('user', UserSchema);

module.exports = User;
