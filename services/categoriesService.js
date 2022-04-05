const faker = require('faker');
const ProductsService = require('./productService');

const service = new ProductsService(5);
class CategoriesServices {
  constructor() {
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let i=0; i<limit; i++) {
      this.categories.push({
        id:faker.datatype.uuid(),
        name:faker.name.title(),
        products:service.find(),
        description:faker.name.jobDescriptor()
      });
    }
  }

  find() {
    return this.categories;
  }

  findOne(id) {
    return this.categories.find(item => item.id === id);
  }
}

module.exports = CategoriesServices;
