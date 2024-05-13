/**
 * @license Apache-2.0/MIT
 * @copyright vladiere
 * */

'use strict';

import dotenv from 'dotenv';

dotenv.config();

// Spotify
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const SCOPES = ['user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'streaming', 'user-follow-read', 'user-top-read', 'user-read-recently-played', 'user-read-email', 'user-read-private', 'user-library-read'];
const BASE_URL = 'https://api.spotify.com';
const TOKEN_BASE_URL = 'https://accounts.spotify.com/authorize';
const STATE_KEY = 'spotify_auth_state';
const MARKET = 'PH';
const LOW_LIMIT = 12;
const DEFAUT_LIMIT = 28;

const SPOTIFY_API = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  redirect_uri: REDIRECT_URL,
  scope: SCOPES,
  base_url: BASE_URL,
  token_base_url: TOKEN_BASE_URL,
  state_key: STATE_KEY,
  market: MARKET,
  low_limit: LOW_LIMIT,
  default_limit: DEFAUT_LIMIT,
};

const MYSQL_HOST = process.env.MYSQLHOST || "localhost";
const MYSQL_USER = process.env.MYSQLUSER || "root";
const MYSQL_PASSWORD = process.env.MYSQLPASSWORD || "31N$t31n";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "spotify_acc";

const MYSQL = {
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  pass: MYSQL_PASSWORD,
};

const SERVER_HOST = process.env.HOST || "localhost";
const SERVER_PORT = process.env.MYSQL_PORT || 3306;
const SERVER_ACCESS_TOKEN_EXPIRETIME = process.env.SERVER_ACCESS_TOKEN_EXPIRETIME || "5m";
const SERVER_REFRESH_TOKEN_EXPIRETIME = process.env.SERVER_REFRESH_TOKEN_EXPIRETIME || "5m";
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "MIT";
const SERVER_SECRET_KEY = process.env.SERVER_SECRET_KEY || "something_Secret";
const SERVER_REFRESH_SECRET_KEY = process.env.SERVER_REFRESH_SECRET_KEY || "something_Secret";

const SERVER_RESET_SECRET_KEY = process.env.SERVER_RESET_SECRET_KEY || 'something_Secret';
const SERVER_RESET_EXPIRETIME = process.env.SERVER_RESET_EXPIRETIME || '60m';

const MYSQL_URL = `mariadb://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${SERVER_PORT}/${MYSQL_DATABASE}`;

const SERVER = {
  hostname: SERVER_HOST,
  port: SERVER_PORT,
  token: {
    refreshTokenExpireTime: SERVER_REFRESH_TOKEN_EXPIRETIME,
    accessTokenExpireTime: SERVER_ACCESS_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    accessSecret: SERVER_SECRET_KEY,
    refreshSecret: SERVER_REFRESH_SECRET_KEY,
    resetAccessSecret: SERVER_RESET_SECRET_KEY,
    resetTokenExpireTime: SERVER_RESET_EXPIRETIME,
  },
};

const config = {
  mysql: MYSQL,
  server: SERVER,
  mysqlurl: MYSQL_URL,
  spotify: SPOTIFY_API,
};

export default config;
