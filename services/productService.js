const faker = require('faker');

class ProductsService {
  constructor(limit) {
    this.limit = limit;
    this.products = [];
    this.generate(this.limit);
  }

  generate(limit) {
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id:faker.datatype.uuid(),
        name:faker.commerce.productName(),
        price:Number(faker.commerce.price()),
        image:faker.image.imageUrl(),
      });
    }
  }

  create() {

  }

  find() {
    return this.products;
  }

  findOne(id) {
    return this.products.find(item => item.id === id);
  }

  update() {

  }

  delete() {

  }
}

module.exports = ProductsService;
