
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

module.exports = router;
