module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		"order_details",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			userAccountId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				field: "user_id",
			},
      status: {
        type: DataTypes.STRING(20),
        defaultValue: 'CREATED',
      },
			total: {
				type: DataTypes.DOUBLE,
				label: "Total",
			},
			createdDate: {
				label: "Created Date",
				type: DataTypes.DATE,
        field: 'created_date'
			},
			updatedDate: {
				label: "Updated Date",
				type: DataTypes.DATE,
        field: 'updated_date'
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
