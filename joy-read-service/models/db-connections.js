const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

const env = process.env.NODE_ENV || 'development';

// =================================================================
// IMPORTANT: This is a template for vertical sharding.
// You MUST update your `config/config.json` to have separate
// configurations for `user_db` and `content_db`.
// See the example structure in the comments below.
// =================================================================

/*
Example `config.json` structure for this to work:

"development": {
  "user_db": {
    "username": "root",
    "password": "your_password",
    "database": "joy_read_user_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "content_db": {
    "username": "root",
    "password": "your_password",
    "database": "joy_read_content_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
},
"production": {
  "user_db": {
    // ... production config for user_db with replication
  },
  "content_db": {
    // ... production config for content_db with replication
  }
}

*/

const db = {};

// Get configs for the current environment
const envConfig = config[env];

if (envConfig.user_db) {
  db.userSequelize = new Sequelize(
    envConfig.user_db.database,
    envConfig.user_db.username,
    envConfig.user_db.password,
    envConfig.user_db
  );
} else {
  console.warn('Warning: `user_db` configuration is missing in config.json');
}

if (envConfig.content_db) {
  db.contentSequelize = new Sequelize(
    envConfig.content_db.database,
    envConfig.content_db.username,
    envConfig.content_db.password,
    envConfig.content_db
  );
} else {
  console.warn('Warning: `content_db` configuration is missing in config.json');
}

// You can add more Sequelize instances here for other databases

export default db;
