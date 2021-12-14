

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
      isEmail: true
    },
    password: {
      type: DataTypes.STRING
    },
  }, {
    freezeTableName: true,
    timestamps: false
  });
  model.removeAttribute('createdAt');
  model.removeAttribute('updatedAt');

  return model;
}