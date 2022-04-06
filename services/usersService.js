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

  create(data) {
    const {username="", firstname="", image=""} = data;
    const user = {
      id:faker.datatype.uuid(),
      username,
      firstname,
      image
    }
    this.users.push(user);
    return user;
  }

  update(id, changes) {
    const index = this.users.findIndex(item => item.id === id);
    const validParameters = ['username', 'firstname', 'image'];
    Object.keys(changes).forEach((key) => validParameters.includes(key) || delete changes[key]);
    if (index === -1) {
      throw new Error('User not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    }
    return this.users[index]
   }

   delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    this.users.splice(index, 1);
    return id + " deleted";
   }
}

module.exports = UsersService;
