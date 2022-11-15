require('dotenv').config();
// const process = require('process');

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_PORT,
    "dialect": "mysql",
    define: {
      timestamps : false
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
