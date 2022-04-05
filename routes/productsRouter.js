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
  response.status(201).json({
    message:'created',
    data:body
  });
});

router.patch('/:id', (request, response) => {
  const { id } = request.params
  const body = request.body;
  response.json({
    id,
    message:'updated',
    data:body
  });
});

router.delete('/:id', (request, response) => {
  const { id } = request.params
  response.json({
    id,
    message:'deleted',
  });
});

module.exports = router;
