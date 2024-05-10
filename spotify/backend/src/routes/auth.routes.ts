import { Router } from "express";
import authController from '../controllers/auth.controller';
import verifyToken from '../utils/verifyToken';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/update', verifyToken, authController.changePass);
router.get('/user/:id', verifyToken, authController.getUserById);

export default router;

