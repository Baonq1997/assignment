
module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    product_name: {
      label: "Product Name",
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      label: "Quantity"
    },
    price: {
      type: DataTypes.DOUBLE,
      label: "Price",
      get() {
        return parseFloat(this.getDataValue('price'), 2) || null;
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