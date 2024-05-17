/**
 * @license Apache-2.0/MIT
 * @copyright vladiere
 * */

'use strict';

import { Router } from 'express';

import * as spotifyCRTL from '../controllers/spotify.controller.js';

const router = Router();

router.get('/', spotifyCRTL.auth);
router.get('/login', spotifyCRTL.login);
router.get('/recentlyplayedtracks', spotifyCRTL.getRecentlyPlayedTracks);

router.post('/refresh', spotifyCRTL.refresh);
router.post('/savedtracks', spotifyCRTL.getSavedTracks);
router.post('/volume', spotifyCRTL.volume);

router.get('/search', spotifyCRTL.search);
router.get('/play', spotifyCRTL.play);
router.get('/pause', spotifyCRTL.pause);
router.get('/devices', spotifyCRTL.getDevices);
router.get('/newreleases', spotifyCRTL.newReleases);
router.get('/currelyplaybackstate', spotifyCRTL.currentPlaybackState);
router.get('/user', spotifyCRTL.getUser);
router.get('/playlisttracks', spotifyCRTL.getPlaylistTracks);

router.post('/get_token', spotifyCRTL.getTokens);

export default router;
