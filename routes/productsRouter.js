const express = require('express');
const ProductsService = require('./../services/productService');

const router = express.Router();
const service = new ProductsService(100);

router.get('/', async (request, response) => {
  const products = await service.find();
  response.json(products);
});

router.get('/filter', (request, response) => {
  response.send("I am a filter");
});

router.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const product = await service.findOne(id);
    response.json(product);
  } catch (error) {
    next(error);
  }

});

router.post('/', async (request, response) => {
  try {
    const body = request.body;
    const newProduct = await service.create(body);
    response.status(201).json({
      message:'created',
      data:newProduct
    });
  } catch (error) {
    response.status(404).json({
      message:error.message
    });
  }

});

router.patch('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const body = request.body;
    const product = await service.update(id, body);
    response.status(200).json({
      message:'updated',
      product
    });
  } catch (err) {
    response.status(404).json({
      message: err.message
    });
  }

});

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const res = await service.delete(id);
    response.status(200).json(res);
  } catch (error) {
    response.status(404).json({
      message:error.message
    });
  }

});

module.exports = router;
