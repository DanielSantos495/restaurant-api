const express = require('express');
const schemaValidation = require('../../utils/middleware/schemaValidation');
const authValidation = require('../../utils/middleware/authValidation');
const { createUserSchema } = require('../../utils/schemas/users')
const AuthService = require('./controller');
const router = express.Router();

const authService = new AuthService();

router.post('/register',
   schemaValidation(createUserSchema),
   async (req, res, next) => {
      const { body: userAuth } = req;
      try {
         const userCreated = await authService.registerUser({ userAuth });
         res.status(201).json({
            data: userCreated,
            message: 'User registered'
         })
      } catch(err) {
         next(err);
   }
});

router.post('/login',  authValidation, async (req, res, next) => {
   const { body: user } = req;

   try {
      const token = await authService.loginUser({ user });
      res.status(201).json({
         data: token,
         message: 'User logged in'
      })
   } catch(err) {
      next(err);
   }
})

module.exports = router;