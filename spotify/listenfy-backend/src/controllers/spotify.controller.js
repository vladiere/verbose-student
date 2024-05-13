/**
 * @license Apache-2.0/MIT
 * @copyright vladiere
 * */

'use strict';

import SpotifyWebApi from 'spotify-web-api-node';
import appConfig from '../config/app.config.js';
import { generateRandomString } from '../utils/generator.util.js';

const spotifyApi = new SpotifyWebApi({
  clientId: appConfig.spotify.client_id,
  clientSecret: appConfig.spotify.client_secret,
  redirectUri: appConfig.spotify.redirect_uri,
})

const auth = (req, res) => {
  const state = generateRandomString(16);
  const scopes = appConfig.spotify.scope;
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

  res.cookie(appConfig.spotify.state_key, state);

  return res.status(200).json({ authorizeURL, stats: true });
}

const login = (req, res) => {
  const { code } = req.body;

  // Exchange the code for an access token and a refresh token.
  spotifyApi.authorizationCodeGrant(code).then(data => {
    const accessToken = data.body['access_token'];
    const refreshToken = data.body['refresh_token'];
    const expiresIn = data.body['expires_in'];

    // Set the access token and refresh token on the Spotify API object.
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);

    return res.status(200).json({ accessToken, refreshToken, expiresIn });
  }).catch(error => {
    console.error('Error getting Tokens:', error);
    return res.status(401).json({ msg: 'Error getting tokens', stats: false });
  });
}

const refresh = (req, res) => {
  const { refreshToken } = req.body;

  spotifyApi = new SpotifyWebApi({
      clientId: config.spotify.client_id,
      clientSecret: config.spotify.client_secret,
      redirectUri: config.spotify.redirect_uri,
      refreshToken,
    });

  spotifyApi.refreshAccessToken().then(data => {

    const accessToken = data.body['access_token'];
    const expiresIn = data.body['expires_in'];

    spotifyApi.setAccessToken(accessToken);

    return res.status(200).json({ accessToken, expiresIn });
  }).catch(err => {
    console.error(`Error getting tokens: ${err}`);
    return res.status(500).json({ msg: 'Error getting tokens', stats: false });
  });
}

// Route handler for the search endpoint.
const search = (req, res) => {
  // Extract the search query parameter.
  const { q } = req.query;

  // Make a call to Spotify's search API with the provided query.
  spotifyApi.searchTracks(q).then(searchData => {
      // Extract the URI of the first track from the search results.
      const result = searchData.body.tracks.items.map(item => {
        return {
          artist: item.artists,
          albums: item.album.images[0],
          name: item.name,
          popularity: item.popularity,
          uri: item.uri,
        }
      });
      // Send the track URI back to the client.
      return res.status(200).json({ result, stats: true });
  }).catch(err => {
      console.error('Search Error:', err);
      return res.status(500).json({ msg: 'Error occurred during search', stats: false });
  });
}

// Route handler for the play endpoint.
const play = (req, res) => {
  // Extract the track URI from the query parameters.
  const { uri } = req.query;

  // Send a request to Spotify to start playback of the track with the given URI.
  spotifyApi.play({ uris: [uri] }).then(() => {
      return res.status(200).json({ msg: 'Playback started', stats: true });
  }).catch(err => {
      console.error('Play Error:', err);
      return res.status(500).json({ msg: 'Error occurred during playback', stats: false });
  });
}

const getRecommendations = (req, res) => {

  spotifyApi.getMySavedTracks({ limit, offset }).then(data => {

    const result = data.body.items.map(item => {
      return {
        artist: item.track.artists,
        albums: item.track.album.images[0],
        name: item.track.name,
        popularity: item.track.popularity,
        uri: item.track.uri,
      }
    })
    return res.status(200).json({ result, stats: true });
  }).catch(err => {
    console.error('Error upon getMySavedTracks', err);
    return res.status(401).json({ msg: 'Error occurred during getting my saved tracks', stats: false });
  })
}

export {
  auth,
  login,
  search,
  refresh,
  play,
  getRecommendations,
}
