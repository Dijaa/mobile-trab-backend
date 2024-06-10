import express from 'express';
import userController from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/login', userController.validaLogin);
userRoutes.post('/register', userController.registraUsuario);

export default userRoutes;