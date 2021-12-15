const { payment: Payment, sequelize } = require("../models/index");

const orderDetailsController = require("./order_details.controller");

/**
 * Save payment information 
 * Order status will be changed to "PAID"
 * @param {number} orderId - OrderId that need to be paid
 * @param {object} payment - Payment information
 * @returns Order information
 */
const payOrder = async (orderId, payment) => {
	try {
		return sequelize.transaction(async (t) => {
			const order = await orderDetailsController.getOrder(orderId);
			if (!order) throw new Error("Order does not exist");

			const paid = await Payment.findOne({
				where: { orderDetailId: order.id },
			});
			if (paid) throw new Error("This order is paid");

			const currentDate = new Date();
			const result = await Payment.create(
				{
					payment_method: payment.payment_method,
					orderDetailId: order.id,
					payment_amount: order.total,
					createdDate: currentDate
				},
				{ transaction: t }
			);
			order.status = "PAID";
			order.updatedDate = currentDate;
			await order.save({ transaction: t });
			return result;
		});
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = {
	payOrder,
};
