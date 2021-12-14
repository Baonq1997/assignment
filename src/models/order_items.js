module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		"order_items",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
      product_name: {
        type: DataTypes.STRING
      },
			orderDetailId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				field: "order_id",
			},
			productId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				field: "product_id",
			},
      price: {
        type: DataTypes.DOUBLE,
      },
			quantity: {
				type: DataTypes.DOUBLE,
			},
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);
	model.removeAttribute("createdAt");
	model.removeAttribute("updatedAt");

	return model;
};
