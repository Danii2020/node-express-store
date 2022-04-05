const faker = require('faker');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i=0; i<limit;i++) {
      this.users.push({
        id:faker.datatype.uuid(),
        username:faker.internet.userName(),
        firstname:faker.name.firstName(),
        image:faker.image.imageUrl()
      });
    }
  }

  find() {
    return this.users;
  }

  findOne(id) {
    return this.users.find(item => item.id === id);
  }
}

module.exports = UsersService;
