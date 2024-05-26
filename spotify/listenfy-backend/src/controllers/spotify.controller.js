/**
 * @license Apache-2.0/MIT
 * @copyright vladiere
 * */

'use strict';

import SpotifyWebApi from 'spotify-web-api-node';
import appConfig from '../config/app.config.js';
import { generateRandomString } from '../utils/generator.util.js';
import Spotify from 'spotify-api.js';

let spotifyApi = new SpotifyWebApi({
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
    const state = generateRandomString(16);
  
    return res.status(200).json({ data: spotifyApi.createAuthorizeURL(appConfig.spotify.scope, state) });
}

const getTokens = (req, res) => {
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
      clientId: appConfig.spotify.client_id,
      clientSecret: appConfig.spotify.client_secret,
      redirectUri: appConfig.spotify.redirect_uri,
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

const pause = (req, res) => {
  spotifyApi.pause().then(() => {
    return res.status(200).json({ msg: 'Playback started', stats: true });
  }).catch(err => {
    console.error('Pause Error:', err);
    return res.status(500).json({ msg: 'Error occurred during pause', stats: false });
  })
}

const getRecentlyPlayedTracks = (req, res) => {
  const { limit } = req.query;

  spotifyApi.getMyRecentlyPlayedTracks({ limit }).then(data => {

    console.log(data.body.items)
    const result = data.body.items.map(item => {
      return {
        artist: item.track.artists,
        albums: item.track.album.images[0],
        name: item.track.name,
        popularity: item.track.popularity,
        uri: item.track.uri,
      }
    });
    return res.status(200).json({ result, stats: true });
  }).catch(err => {
    console.error('Error upon getMySavedTracks', err);
    return res.status(401).json({ msg: 'Error occurred during getting my saved tracks', stats: false });
  })
}

const getDevices = async (req, res) => {
  spotifyApi.getMyDevices().then(data => {
    let availableDevices = data.body.devices;
    return res.status(200).json({ devices: availableDevices, stats: 200, device_id });
  }).catch(err => {
    console.error('Error upon getting devices: ', err);
    return res.status(403).json({ msg: 'Error upon getting devices', stats: false, err });
  })
}

const currentPlaybackState = (req, res) => {
  spotifyApi.getMyCurrentPlaybackState().then(data => {
    if (data.body && data.body.is_playing) {
      console.log('User is currently playing music');
      return res.status(200).json({ isPlaying: true, msg: 'Currently playing' })
    } else {
      console.log('User is currently playing music');
      return res.status(200).json({ isPlaying: false, msg: 'Currently not playing' })
    }
  }).catch(err => {
    console.error('Error on currentPlaybackState: ', err);
    return res.status(403).json({ msg: 'Error getMyCurrentPlaybackState', stats: false, err });
  })
}

const newReleases = (req, res) => {
  const { limit, offset } = req.params;
  
  spotifyApi.getNewReleases({ limit, offset, country: 'PH' }).then(data => {
    console.log(data);
    return res.send('testing');
  }).catch(err => {
    console.error('Error on getting new releases: ', err);
    return res.status(403).json({ msg: 'Error on getting new releases', stats: false });
  })
}

const getUser = (req, res) => {
  spotifyApi.getMe().then(data => {
    return res.status(200).json({ user: data.body, stats: true });
  }).catch(err => {
    console.error("Error in getting user's data: ", err);
    return res.status(403).json({ msg: 'Error in getting user data', stats: false });
  })
}

const getPlaylistTracks = (req, res) => {
  const { id } = req.query;
  console.log(id);

  spotifyApi.getPlaylistTracks(id, { offset: 1, limit: 5, fields: 'items' }).then(data => {
    console.log(data);
    return res.status(200).json({ data: data.body, stats: true });
  }).catch(async err => {
    console.error('Error on getting playlist tracks: ', err);

    return res.status(403).json({ msg: 'Error on getting playlist tracks', stats: false });
  })
}

const getSavedTracks = (req, res) => {
  const { limit, offset } = req.body;

  spotifyApi.getMySavedTracks( { limit, offset }).then(data => {
    console.log(data.body);
    const dataTracks = data.body.items.map(e => {
      return {
        album_uri: e.track.album.uri,
        image: e.track.album.images[0].url,
        uri: e.track.uri,
        name: e.track.name,
        artists: e.track.artists.map(e => e.name),
      }
    })
    return res.status(200).json({ dataTracks, data: data.body.items });
  }).catch(err => {
    console.error('Error in getting top artist: ', err);
    return res.status(403).json({ msg: 'Error in getting top artists', stats: false });
  })
}

const volume = (req, res) => {
  const { vol } = req.body;

  spotifyApi.setVolume(vol).then(() => {
    return res.status(200).json({ stats: true });
  }).catch(err => {
    console.log('Error on setting volume: ', err);
    return res.status(403).json({ msg: 'Error on setting volumne', stats: false });
  })
}

export {
  auth,
  login,
  search,
  refresh,
  play,
  pause,
  getRecentlyPlayedTracks,
  getTokens,
  newReleases,
  currentPlaybackState,
  getDevices,
  getUser,
  getPlaylistTracks,
  getSavedTracks,
  volume,
}
