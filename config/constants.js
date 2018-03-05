const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const constants = {
  ROOT_CONFIG: {
    ROOT_DIRECTORY: ROOT_PATH
  },
  MODEL: {
    SOFT_DELETE: false
  },
  APPLICATION: {
    SERVER_NAME: "API Chatty",
    VERSION: "1.0.0",
    BASE_URL: '/'
  }
};

module.exports = constants;
