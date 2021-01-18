const Joi = require('@hapi/joi');

// Para validar el id de MongoDB que es un ObjectId
const productIdSchema = Joi.object({
   productId: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'))
});


const createProductSchema = Joi.object({
   name: Joi.string().max(50).required(),
   description: Joi.string().max(255).required(),
   price: Joi.number().min(1).max(1000000).required(),
   type: Joi.string().valid('sushi').valid('bebidas').valid('postres').required(),
   status: Joi.boolean().required()
});

const updateProductSchema = Joi.object({
   name: Joi.string().max(50),
   description: Joi.string().max(255),
   price: Joi.number().min(1).max(1000000),
   status: Joi.boolean()
});

module.exports = {
   productIdSchema,
   createProductSchema,
   updateProductSchema
}