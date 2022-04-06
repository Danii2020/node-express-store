const faker = require('faker');
const boom = require('@hapi/boom');

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
        isBlocked:faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    const newProduct = {
      id:faker.datatype.uuid(),
      ...data,
      isBlocked:faker.datatype.boolean()
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    });

  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id);
    if (!product){
      throw boom.notFound('Product not found');
    }
    if (product.isBlocked) {
      throw boom.conflict('Product is blocked');
    }
    return product
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1){
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1){
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return id + ' deleted!';
  }
}

module.exports = ProductsService;
