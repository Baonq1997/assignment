const path = require('path');
const fs = require('fs')
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
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

db['product'].hasMany(db['order_items']);
db['order_items'].belongsTo(db['product']);

db['order_details'].hasMany(db['order_items'], {
  foreignKey: 'order_id'
});
db['order_items'].belongsTo(db['order_details']);

db['user_account'].hasMany(db['order_details'], {
  foreignKey: 'user_id'
});
db['order_details'].belongsTo(db['user_account']);

db['order_details'].hasOne(db['payment']);
db['payment'].belongsTo(db['order_details']);

db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;