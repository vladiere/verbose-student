/**
 * @license apache-2.0/mit
 * @copyright vladiere
 * */

'use strict';

import { Router } from "express";
import authController from '../controllers/auth.controller.js';
import verifyToken from '../utils/verifyToken.util.js';
import refreshTokens from '../utils/resetToken.util.js';

const router = Router();

router.get('/user/:id', verifyToken, authController.getUserById);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/update', verifyToken, authController.changePass);
router.post('/refresh', refreshTokens);

export default router;
