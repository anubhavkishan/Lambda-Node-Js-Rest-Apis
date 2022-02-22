const dbConfig = require('../dbConfig/dbConfig');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize (
    dbConfig.database,
    dbConfig.user,
    dbConfig.password, {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.acquire
        }
    }
)

// checking database connection
sequelize.authenticate()
.then(() => {
    console.log("*** Database is Connected ***");
})
.catch(error => {
    console.log("Error : " + error);
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// user table model
db.users = require('./userModel')(sequelize, DataTypes)


// for create table if not exist
db.sequelize.sync({
    force: false
})
.then(() => {
    console.log("Re-Sync Done !");
})

module.exports = db;