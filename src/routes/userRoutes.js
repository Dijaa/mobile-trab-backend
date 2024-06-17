import express from 'express';
import userController from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/login', userController.validaLogin);
// userRoutes.post('/register', userController.registraUsuario);
// userRoutes.put('/:id', userController.updateUser);
// userRoutes.delete('/:id', userController.deleteUser);

export default userRoutes;