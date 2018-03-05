const _ = require('lodash');

const ThrowerService = (error) => {
  return {message: error}
};

module.exports = ThrowerService;
