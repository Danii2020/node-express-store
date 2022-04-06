const faker = require('faker');
const ProductsService = require('./productService');
const boom = require('@hapi/boom');

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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.categories);
      }, 3000);
    });

  }


  async findOne(id) {
    const category = this.categories.find(item => item.id === id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }
  async create(data) {
    const {name="", products=[], description=""} = data;
    const category = {
      id:faker.datatype.uuid(),
      name,
      products,
      description
    }
    this.categories.push(category);
    return category;
  }

  async update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id);
    const validParameters = ['name', 'products', 'description'];
    Object.keys(changes).forEach((key) => validParameters.includes(key) || delete changes[key]);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    }
    return this.categories[index]
  }

  async delete(id) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    this.categories.splice(index, 1);
    return id + " deleted";
  }

}

module.exports = CategoriesServices;
