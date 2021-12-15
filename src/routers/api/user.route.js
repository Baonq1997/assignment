const userController = require("../../controller/user.controller");
module.exports = function (router) {
	router.post("/user/signup", async (req, res) => {
		// Create a new user
		try {
			const user = userController.signUp(req.body);
			res.status(200).send(user.token);
		} catch (error) {
			console.error(error);
			res.status(400).send(error);
		}
	});

	router.post("/user/login", async (req, res) => {
		try {
			const user = await userController.signIn(req.body);
			res.status(200).send(user);
		} catch (error) {
			console.error(error);
			res.status(400).send(error);
		}
	});
};
