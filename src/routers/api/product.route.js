const productController = require("../../controller/product.controller");

module.exports = function (router) {
	router.get("/api/products", async (req, res) => {
		try {
			const result = await productController.getProducts();
			res.status(200).send(result);
		} catch (error) {
			res.status(400).send(error);
		}
	});
};
