const _ = require('lodash');

module.exports = exports = function Timestamp(schema) {
  schema.add({updatedAt: Date});
  schema.pre('save', async function (next) {
    if (!this.createdAt)
      this.createdAt = new Date();
    this.updatedAt = new Date();
    next();
  });
};
