const productController = require('../../controller/product.controller');


module.exports = function (router) {
  router.get('/api/products', async (req, res) => {
    // Create a new user
    try {
      console.log('userRoute.js')
        // const user = new User(req.body)
        // await user.save()
        const result = await productController.getProducts();
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error)
    }
})
}