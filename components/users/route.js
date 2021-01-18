const express = require('express');
const UsersService = require('./controller');
const router = express.Router();

const usersService = new UsersService();

router.get('/', async (req, res, next) => {
   try {
      const allUsers = await usersService.getUsers();
      res.status(200).json({
         data: allUsers,
         message: 'Users listed'
      });
   } catch(err) {
      next(err);
   }
});

router.get('/:userId', async (req, res, next) => {

   const { userId } = req.params;
   try {
      const user = await usersService.getUser({ userId });
      res.status(200).json({
         data: user,
         message: 'User listed '
      });
   } catch(err) {
      next(err);
   }
});

router.put('/:userId', async (req, res, next) => {
   const { userId } = req.params;
   const { body: user } = req;
   try {
      const updateUser = await usersService.updateUser({ userId, user });
      res.status(200).json({
         data: updateUser,
         message: 'User update'
      });
   } catch(err) {
      next(err);
   }
});

router.delete('/:userId', async (req, res, next) => {
   const { userId } = req.params;
   try {
      const deleteUser = await usersService.deleteUser({ userId });
      res.status(200).json({
         data: deleteUser,
         message: 'User delete'
      });
   } catch(err) {
      next(err);
   }
});

module.exports = router;