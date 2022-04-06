
const express = require('express');
const router = express.Router();
const UsersService = require('./../services/usersService');

const service = new UsersService();

router.get('/', (request, response) => {
  const users = service.find();
  response.status(200).json(users);
});

router.get('/:id', (request, response) => {
  const { id } = request.params;
  const user = service.findOne(id);
  response.json(user);
});

router.post('/', (request, response) => {
  const body = request.body;
  const user = service.create(body);
  response.status(201).json({
    message:"created",
    data:user
  });
});

router.patch('/:id', (request, response) => {
  const { id } = request.params;
  const body = request.body;
  const user = service.update(id, body);
  response.status(200).json({
    message:"updated",
    user
  });
});

router.delete('/:id', (request, response) => {
  const { id } = request.params;
  const res = service.delete(id);
  response.status(200).json(res);
});

module.exports = router;
