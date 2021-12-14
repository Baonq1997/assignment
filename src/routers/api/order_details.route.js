const orderController = require('../../controller/order_details.controller');


module.exports = function (router) {
  router.post('/api/order', async (req, res,next) => {
    try {
        const user = req.user;
        const result = await orderController.orderProducts(req.body, user);
        res.status(200).send(result)
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
})
}