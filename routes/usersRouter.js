
const express = require('express');
const router = express.Router();
const UsersService = require('./../services/usersService');

const service = new UsersService();

router.get('/', async (request, response) => {
  const users = await service.find();
  response.status(200).json(users);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const user = await service.findOne(id);
  response.json(user);
});

router.post('/', async (request, response) => {
  const body = request.body;
  const user = await service.create(body);
  response.status(201).json({
    message:"created",
    data:user
  });
});

router.patch('/:id', async(request, response) => {
  try {
    const { id } = request.params;
    const body = request.body;
    const user = await service.update(id, body);
    response.status(200).json({
      message:"updated",
      user
  });
  } catch (error) {
    response.status(404).json({
      message:error.message
    })
  }

});

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const res = await service.delete(id);
    response.status(200).json(res);
  } catch (error) {
    response.status(404).json({
      message:error.message
    });
  }

});

module.exports = router;
