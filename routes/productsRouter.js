const express = require('express');
const ProductsService = require('./../services/productService');

const router = express.Router();
const service = new ProductsService(100);

router.get('/', (request, response) => {
  const products = service.find();
  response.json(products);
});

router.get('/filter', (request, response) => {
  response.send("I am a filter");
});

router.get('/:id', (request, response) => {
  const { id } = request.params;
  const product = service.findOne(id);
  response.json(product);
});

router.post('/', (request, response) => {
  const body = request.body;
  const newProduct = service.create(body);
  response.status(201).json({
    message:'created',
    data:newProduct
  });
});

router.patch('/:id', (request, response) => {
  const { id } = request.params
  const body = request.body;
  const product = service.update(id, body);
  response.status(200).json({
    message:'updated',
    product
  });
});

router.delete('/:id', (request, response) => {
  const { id } = request.params
  const res = service.delete(id);
  response.status(200).json(res);
});

module.exports = router;
