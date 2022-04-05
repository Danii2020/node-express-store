
const express = require('express');
const router = express.Router();
const faker = require('faker');

router.get('/', (request, response) => {
  const users = [];
  const { size } = request.query;
  const limit = size | 10;
  for (let i=0; i<limit;i++) {
    users.push({
      username:faker.internet.userName(),
      firstname:faker.name.firstName(),
      image:faker.image.imageUrl()
    });
  }
  response.send(users);


});

module.exports = router;
