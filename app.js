const express = require("express");

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const db = require("./src/models");
const router = require("./src/routers/route");
const app = express();
const bcrypt = require("bcryptjs");

app.use(express.json());
app.use("/", router());

const config = {
	express: {
		port: process.env.PORT || 7001,
	},
};

// Dummy data
async function initial() {
  try {
    await db.user_account.create({
      email: "test@gmail.com",
      password: bcrypt.hashSync("123456", 8),
    });
  
    await db.product.create({
      product_name: "Product1",
      quantity: 10,
      price: 10.5,
    });
  
    await db.product.create({
      product_name: "Product2",
      quantity: 20,
      price: 20.5,
    });
  
    await db.product.create({
      product_name: "Product3",
      quantity: 30,
      price: 30.5,
    });
  } catch (error) {
    // Error will by thrown when not force to re-generate database
  }
}

const setup = () => {
	return new Promise((res) => {
		try {
      // Only drop table when performing testing
			const force = process.env.NODE_ENV === "test";
			db.sequelize
				.sync({ force: force })
				.then(initial)
				.then(() => {
					app.listen(config.express.port, () => {
						console.log(`Server running on port ${config.express.port}`);
						res(app);
					});
				});
		} catch (error) {
			console.error(error.message);
		}
	});
};

// Need to init database before executing tests
if (process.env.NODE_ENV !== "test") {
  setup();
}

module.exports = setup;
