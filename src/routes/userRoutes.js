import express from 'express';
import userController from '../controllers/userController';

const userRoutes = express.Router();

router.post('/login', userController.validaLogin);
router.post('/register', userController.registraUsuario);

export default userRoutes;