const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {

  development: {
    root: rootPath,
    app: {
      name: 'chatty_dev'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/chatty_dev'
  },

  test: {
    root: rootPath,
    app: {
      name: 'foodsAndFriends_test'
    },
    port: 3009,
    db: 'mongodb://localhost/chatty_test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'chatty'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/chatty'
  }
};

module.exports = config[env];
