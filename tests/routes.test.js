const request = require("supertest");
const setup = require("../app");

let app;
let token;
let products = [];
beforeAll(() => {
	return setup().then((server) => (app = server));
});
describe("User EndPoints", () => {
	it("should get token", async () => {
		const res = await request(app).post("/user/login").send({
			email: "test@gmail.com",
			password: "123456",
		});
		token = res.body.token;
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("token");
	});
});

describe("Get Products", () => {
	it("should get 3 products", async () => {
		const res = await request(app)
			.get("/api/products")
			.set("Accept", "application/json")
			.set("Authorization", `Bearer ${token}`);
		products = res.body;
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toEqual(3);
	});
});

describe("Create Orders", () => {
	test("Order 3 products with quantity 5", async () => {
		products = products.map((item) => {
			item.quantity = 5;
			return item;
		});

		const res = await request(app)
			.post("/api/order")
			.send(products)
			.set("Accept", "application/json")
			.set("Authorization", `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body.order_items.length).toEqual(3);
		expect(res.body.status).toEqual("CREATED");
		expect(res.body).toHaveProperty("id");
	});
});
