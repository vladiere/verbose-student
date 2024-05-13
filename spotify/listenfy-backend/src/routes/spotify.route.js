/**
 * @license Apache-2.0/MIT
 * @copyright vladiere
 * */

'use strict';

import { Router } from 'express';

import { auth, search, login, play, refresh, getRecommendations } from '../controllers/spotify.controller.js';

const router = Router();

router.get('/', auth);
router.post('/login', login);
router.get('/recommendations', getRecommendations);

router.get('/search', search);
router.get('/play', play);

export default router;
