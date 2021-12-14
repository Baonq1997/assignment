const paymentController = require("../../controller/payment.controller");

module.exports = function (router) {
	router.post("/api/payment/order/:id", async (req, res, next) => {
		try {
			const orderId = req.params.id;
			const result = await paymentController.payOrder(orderId, req.body);
			res.status(200).send(result);
		} catch (error) {
			console.error(error);
			res.status(500).send(error.message.replace("Error: ", ""));
		}
	});
};
