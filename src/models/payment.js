module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		"payment",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
      payment_method: {
        type: DataTypes.STRING
      },
			orderDetailId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				field: "order_id",
			},
      payment_amount: {
        type: DataTypes.DOUBLE,
      },
			createdDate: {
				label: "Created Date",
				type: DataTypes.DATE,
        field: 'created_date'
			}
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
