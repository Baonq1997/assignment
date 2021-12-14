const {
	order_details: OrderDetails,
	order_items: OrderItems,
	sequelize,
} = require("../models/index");

const productController = require("./product.controller");

const orderProducts = async (orderedProducts, user) => {
	try {
		return sequelize.transaction(async (transaction) => {
			const orderDetails = await OrderDetails.create(
				{
					total: 0,
					userAccountId: user.id,
				},
				{ transaction }
			);

			// get list of products
			const productIds = orderedProducts.map((item) => item.id);
			const products = await productController.getProductsByIds(productIds);

			let orderItems = [];
			for (const product of products) {
				const orderProduct = orderedProducts.find(
					(item) => item.product_name === product.product_name
				);

				if (product.quantity === 0) {
					throw new Error(`${product.product_name} is out of stock`);
				}
				if (product.quantity < orderProduct.quantity) {
					throw new Error(
						`Inventory only has ${product.quantity} remaining for ${product.product_name}`
					);
				}

				product.quantity = product.quantity - orderProduct.quantity;
				const item = await OrderItems.create(
					{
						product_name: product.product_name,
						price: product.price,
						quantity: orderProduct.quantity,
						userId: user.id,
						productId: product.id,
						orderDetailId: orderDetails.id,
					},
					{ transaction }
				);
				orderItems.push(item);

				// Update remaining product
				await product.save({ transaction });
			}

			orderDetails.total = orderItems.reduce((acc, cur) => {
				return acc + cur.price * cur.quantity;
			}, 0);
			await orderDetails.save({ transaction });

			return buildDto(orderDetails, orderItems, user);
		});
	} catch (error) {
		throw new Error(error);
	}
};

const buildDto = (order, orderItems, user) => {
	const data = {
		id: order.id,
		status: order.status,
		total: order.total,
		order_items: orderItems.map((orderItem) => {
			return {
				id: orderItem.id,
				product_name: orderItem.product_name,
				quantity: orderItem.quantity,
				price: parseFloat(orderItem.price),
			};
		}),
		user: {
			email: user.email,
		},
	};
	return data;
};

const getOrder = async (orderId) => {
	return await OrderDetails.findOne({ where: { id: orderId } });
};

module.exports = {
	orderProducts,
	getOrder,
};
