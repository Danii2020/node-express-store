const Joi = require('joi');

const id = Joi.string().uuid();

const username = Joi.string()
  .min(3)
  .max(15);

const firstname = Joi.string()
  .min(3)
  .max(15);

const image = Joi.string().uri();

const createUserSchema = Joi.object({
  username:username.required(),
  firstname:firstname.required(),
  image:image.required()
});

const updateUserSchema = Joi.object({
  username:username,
  firstname:firstname,
  image:image
});

const getUserSchema = Joi.object({
  id:id.required()
});

module.exports = {createUserSchema, updateUserSchema, getUserSchema}

