const express = require('express');
const faker = require('faker');
const router = express.Router();

router.get('/', (request, response) => {
  const products = [];
  const { size } = request.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      name:faker.commerce.productName(),
      price:Number(faker.commerce.price()),
      image:faker.image.imageUrl(),
    });
  }
  response.json(products);
});

router.get('/filter', (request, response) => {
  response.send("I am a filter");
});

router.get('/:id', (request, response) => {
  const { id } = request.params;
  response.json({
    id,
    name:"Product 2",
    price:2000
  });
});

router.post('/', (request, response) => {
  const body = request.body;
  response.json({
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
