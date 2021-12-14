const { user_account: UserAccount } = require("../models/index");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signUp = async (user) => {
	try {
		user.password = await bcrypt.hash(user.password, 8);
		const result = await UserAccount.create(user);
		return result;
	} catch (err) {
		console.debug(err);
		throw new Error({ error: "Can not create user" });
	}
};

const findUserByEmail = async (email) => {
	const user = await UserAccount.findOne({
		where: {
			email,
		},
		raw: true,
	});

	return user;
};

const signIn = async ({ email, password }) => {
	const user = await findUserByEmail(email);
	if (!user) {
		throw new Error({ error: "Invalid login credentials" });
	}

	const isValid = bcrypt.compareSync(password, user.password);
	if (!isValid) {
		throw new Error({ error: "Invalid login credentials" });
	}

	// generate JWT token
	const token = jwt.sign({ email: user.email }, config.secret, {
		expiresIn: 86400, // 24 hours
	});

	const res = {
		...user,
		token,
	};
	return res;
};

module.exports = {
	signUp,
	findUserByEmail,
	signIn,
};
