
const express = require('express');
const router = express.Router();
const CategoriesServices = require('./../services/categoriesService');
const validatorHandler = require('./../middlewares/validator.handler');
const {createCategorySchema, updateCategorySchema, getCategorySchema} = require('./../schemas/categories.schema');

const service = new CategoriesServices();

router.get('/', async (request, response) => {
  const categories = await service.find();
  response.json(categories);
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (request, response, next) => {
  try {
    const { id } = request.params;
    const category = await service.findOne(id);
    response.json(category);
  } catch (error) {
    next(error);
  }

});

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (request, response) => {
  const body = request.body;
  const newCategory = await service.create(body);
  response.status(201).json({
    message:'created',
    data:newCategory
  });
});

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (request, response, next) => {
  try {
    const { id } = request.params
    const body = request.body;
    const category = await service.update(id, body);
    response.status(200).json({
      message:'updated',
      category
  });
  } catch (error) {
    next(error);
  }

});

router.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const res = await service.delete(id);
    response.status(200).json(res);
  } catch (error) {
    next(error);
  }

});

module.exports = router;
