const Joi = require('@hapi/joi')

const userIdSchema = Joi.object({
   productId: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'))
});

const createUserSchema = Joi.object({
   name: Joi.string().min(3).max(20).required(),
   username: Joi.string().min(4).max(20).required(),
   passowrd: Joi.string().min(8).max(20).required()
});

const updateUserSchema = Joi.object({
   name: Joi.string().min(3).max(20),
   username: Joi.string().min(4).max(20),
   passowrd: Joi.string().min(8).max(20)
});

module.exports = {
   userIdSchema,
   createUserSchema,
   updateUserSchema
}