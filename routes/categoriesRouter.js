
const express = require('express');
const router = express.Router();
const CategoriesServices = require('./../services/categoriesService');

const service = new CategoriesServices();

router.get('/', (request, response) => {
  const categories = service.find();
  response.json(categories);
});

router.get('/:id', (request, response) => {
  const { id } = request.params;
  const category = service.findOne(id);
  response.json(category);
});

router.post('/', (request, response) => {
  const body = request.body;
  const newCategory = service.create(body);
  response.status(201).json({
    message:'created',
    data:newCategory
  });
});

router.patch('/:id', (request, response) => {
  const { id } = request.params
  const body = request.body;
  const category = service.update(id, body);
  response.status(200).json({
    message:'updated',
    category
  });
});

router.delete('/:id', (request, response) => {
  const { id } = request.params
  const res = service.delete(id);
  response.status(200).json(res);
});

module.exports = router;
