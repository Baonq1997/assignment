const { payment: Payment, sequelize } = require("../models/index");

const orderDetailsController = require("./order_details.controller");

const payOrder = async (orderId, payment) => {
	try {
		return await sequelize.transaction(async (t) => {
			const order = await orderDetailsController.getOrder(orderId);
			if (!order) throw new Error("Order does not exist");

      const paid = await Payment.findOne({where: {orderDetailId: order.id}});
      if (paid) throw new Error("This order is paid");
      
			const result = await Payment.create(
				{
					payment_method: payment.payment_method,
					orderDetailId: order.id,
					payment_amount: order.total,
				},
				{ transaction:t }
			);
			order.status = "PAID";
      order.updatedDate = new Date();
			await order.save({ transaction:t });
			return result;
		});
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = {
	payOrder,
};