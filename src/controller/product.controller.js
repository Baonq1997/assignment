
const { Op } = require('sequelize/dist');
const {
  product: Product
} = require('../models/index');

const getProducts = async () => {
  const result = Product.findAll();
  return result;
}

const getProductsByIds = async(ids) => {
  const result = await Product.findAll({
    where: {
      id: {
        [Op.in]: ids
      }
    }
  });
  return result;
}

module.exports = {
  getProducts,
  getProductsByIds
}