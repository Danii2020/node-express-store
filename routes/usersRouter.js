
const express = require('express');
const router = express.Router();
const UsersService = require('./../services/usersService');
const validatorHandler = require('./../middlewares/validator.handler');
const {createUserSchema, updateUserSchema, getUserSchema} = require('./../schemas/users.schema');
const service = new UsersService();

router.get('/', async (request, response) => {
  const users = await service.find();
  response.status(200).json(users);
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (request, response, next) => {
  try {
    const { id } = request.params;
    const user = await service.findOne(id);
    response.json(user);
  } catch (error) {
    next(error);
  }

});

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (request, response) => {
  const body = request.body;
  const user = await service.create(body);
  response.status(201).json({
    message:"created",
    data:user
  });
});

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async(request, response, next) => {
  try {
    const { id } = request.params;
    const body = request.body;
    const user = await service.update(id, body);
    response.status(200).json({
      message:"updated",
      user
  });
  } catch (error) {
    next(error);
  }

});

router.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const res = await service.delete(id);
    response.status(200).json(res);
  } catch (error) {
    next(error);
  }

});

module.exports = router;
