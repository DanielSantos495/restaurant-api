const express = require('express');
const jwtValidation = require('../../utils/middleware/jwtValidation');
const cacheResponse = require('../../utils/cacheResponse');
const { FIVE_SECONDS } = require('../../utils/time');
const schemaValidation = require('../../utils/middleware/schemaValidation');
const { productIdSchema, createProductSchema, updateProductSchema } = require('../../utils/schemas/products');;
const router = express.Router();
const ProductService = require('./controller');
const config = require('../../config');

const productService = new ProductService;

router.get('/', async (req, res, next) => {
   if(config.env === 'production') {
      cacheResponse(res, FIVE_SECONDS);
   }
   try {
      const allProducts = await productService.getProducts();
      res.status(200).json({
         data: allProducts,
         message: 'Products listed'
      })
   } catch(err) {
      next(err);
   }
});

router.get('/:productId', async (req, res, next) => {
   if(config.env === 'production') {
      cacheResponse(res, FIVE_SECONDS)
   }
   const { productId } = req.params;

   try {
      const product = await productService.getProduct({ productId });
      res.status(200).json({
         data: product,
         message: 'Product listed'
      })
   } catch(err) {
      next(err);
   }
});

router.post('/',
   jwtValidation,
   schemaValidation(createProductSchema),
   async (req, res, next) => {

   const { body: product } = req;
   try {
      const createdProduct = await productService.createProduct({ product });
      res.status(201).json({
         data: createdProduct,
         message: 'Product created'
      })
   } catch(err) {
      next(err);
   }
});

router.put('/:productId',
   jwtValidation,
   schemaValidation(updateProductSchema),
   schemaValidation(productIdSchema, 'params'),
   async (req, res, next) => {

   const { productId } = req.params;
   const { body: product } = req;
   try {
      const updateProduct = await productService.updateProduct({ productId, product });
      res.status(200).json({
         data: updateProduct,
         message: 'Product update'
      })
   } catch(err) {
      next(err);
   }
});

router.delete('/:productId',  jwtValidation, async (req, res, next) => {

   const { productId } = req.params;
   try {
      const deleteProduct = await productService.deleteProduct({ productId });
      res.status(200).json({
         data: deleteProduct,
         message: 'Product delete'
      })
   } catch(err) {
      next(err);
   }
});


module.exports = router