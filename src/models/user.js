
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('user_account', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Please enter a valid email addresss" }
      },
      isEmail: true
    },
    // password_hash: { type: DataTypes.STRING(80), allowNull: false },
    password: {
      type: DataTypes.STRING
      // set: async function (val) {
      //   //this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
      //   const value = await bcrypt.hash(user.password, 8);
      //   this.setDataValue('password_hash', value);
      // },
      ,validate: {
        isLongEnough: function (val) {
          if (val.length < 8) {
            throw new Error("Please choose a longer password");
          }
        }
      }
    },
  }, {
    freezeTableName: true,
    timestamps: false
  });
  model.removeAttribute('createdAt');
  model.removeAttribute('updatedAt');

  return model;
}