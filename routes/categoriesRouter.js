
const express = require('express');
const router = express.Router();
const CategoriesServices = require('./../services/categoriesService');

const service = new CategoriesServices();

router.get('/', async (request, response) => {
  const categories = await service.find();
  response.json(categories);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const category = await service.findOne(id);
  response.json(category);
});

router.post('/', async (request, response) => {
  const body = request.body;
  const newCategory = await service.create(body);
  response.status(201).json({
    message:'created',
    data:newCategory
  });
});

router.patch('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const body = request.body;
    const category = await service.update(id, body);
    response.status(200).json({
      message:'updated',
      category
  });
  } catch (error) {
    response.status(404).json({
      message:error.message
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
