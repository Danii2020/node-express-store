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
  create(data) {
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

  update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id);
    const validParameters = ['name', 'products', 'description'];
    Object.keys(changes).forEach((key) => validParameters.includes(key) || delete changes[key]);
    if (index === -1) {
      throw new Error('Category not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    }
    return this.categories[index]
   }

   delete(id) {
    const index = this.categories.findIndex(item => item.id === id);
    this.categories.splice(index, 1);
    return id + " deleted";
   }
}

module.exports = CategoriesServices;
