const Joi = require('joi');

const id = Joi.string().uuid();

const name = Joi.string()
  .min(3)
  .max(15);

const products = Joi.object({
  name:Joi.string().min(3).max(15),
  price:Joi.number().integer().min(5).max(999999),
  image:Joi.string().uri()
});

const description = Joi.string()
  .min(5)
  .max(30);

const createCategorySchema = Joi.object({
  name:name.required(),
  products:products.required(),
  description:description.required()
});

const updateCategorySchema = Joi.object({
  name:name,
  products:products,
  description:description
});

const getCategorySchema = Joi.object({
  id:id.required()
});

module.exports = {createCategorySchema, updateCategorySchema, getCategorySchema}

