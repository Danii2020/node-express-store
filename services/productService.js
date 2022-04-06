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

  async create(data) {
    const {name="", price=0, image=""} = data;
    const newProduct = {
      id:faker.datatype.uuid(),
      name,
      price,
      image
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });

  }

  async findOne(id) {
    return this.products.find(item => item.id === id);
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    const validParameters = ['name', 'price', 'image'];
    Object.keys(changes).forEach((key) => validParameters.includes(key) || delete changes[key]);
    if (index === -1){
      throw new Error('Product not found');
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
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);
    return id + ' deleted!';
  }
}

module.exports = ProductsService;
