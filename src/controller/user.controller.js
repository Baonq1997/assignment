const { user_account: UserAccount } = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * Register user to system with encrypted password
 * @param {object} user - User information
 * @returns user information
 */
const signUp = async (user) => {
	try {
		user.password = await bcrypt.hash(user.password, 8);
		const result = await UserAccount.create(user);
		return result;
	} catch (err) {
		console.error(err);
		throw new Error({ error: "Can not create user" });
	}
};

const findUserByEmail = async (email) => {
	return  await UserAccount.findOne({
		where: {
			email,
		},
		raw: true,
	});
};

/**
 * Returns valid user with token
 * @param {object} user - user's email and password
 * @returns user information with token
 */
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
	const token = jwt.sign({ email: user.email }, process.env.SECRET, {
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
