const dbConfig = require('../db/db.config.js');
const path = require('path');
const fs = require('fs')
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
});

const db = {};
const filebasename = path.basename(__filename);

fs
  .readdirSync(__dirname)
  .filter((file) => {
    const returnFile = (file.indexOf('.') !== 0)
      && (file !== filebasename)
      && (file.slice(-3) === '.js');
    return returnFile;
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes)
    db[model.name] = model;
  });

// product 1:N order items
db['product'].hasMany(db['order_items']);
db['order_items'].belongsTo(db['product']);

// order details 1: N order_items
db['order_details'].hasMany(db['order_items'], {
  foreignKey: 'order_id'
});
db['order_items'].belongsTo(db['order_details']);

// user 1:N order details
db['user_account'].hasMany(db['order_details'], {
  foreignKey: 'user_id'
});
db['order_details'].belongsTo(db['user_account']);

db['order_details'].hasOne(db['payment']);
db['payment'].belongsTo(db['order_details']);

db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;