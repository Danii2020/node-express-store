
const express = require('express');
const router = express.Router();
const UsersService = require('./../services/usersService');

const service = new UsersService();

router.get('/', (request, response) => {
  const users = service.find();
  response.json(users);
});

router.get('/:id', (request, response) => {
  const { id } = request.params;
  const user = service.findOne(id);
  response.json(user);
});

module.exports = router;
