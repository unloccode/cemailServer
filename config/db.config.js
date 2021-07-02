//import db settings
const env = require('./env.js');

//import sequelize
const Sequelize = require('sequelize');
//call sequelize
const sequelize = new Sequelize(
    env.database,
    env.username,
    env.password,
    {
        host: env.host,
        dialect: env.dialect,
        operatorAliases: false,
        pool: {
            max: env.max,
            min: env.pool.min,
            acquire: env.pool.acquire,
            idle: env.pool.idle
        }
    }
);
//init db
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//require user model
db.User = require('../models/user.model.js')(sequelize, Sequelize);
//export
module.exports = db;