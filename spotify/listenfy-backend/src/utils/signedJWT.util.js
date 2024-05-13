/**
 * @license apache-2.0/mit
 * @copyright vladiere
 * */

'use strict';

import jwt from "jsonwebtoken";
import config from "../config/app.config.js";
import { executeQuery } from "./executeQuery.util.js";

const signedJWT = (
  user,
  callback,
) => {
  try {
    // Create the access token
    jwt.sign(
      {
        username: user.username,
        user_id: user.id,
      },
      config.server.token.accessSecret,
      {
        issuer: config.server.token.issuer,
        algorithm: "HS256",
        expiresIn: config.server.token.accessTokenExpireTime,
      },
      (error, accessToken) => {
        if (error) {
          callback(error, null, null);
        } else if (accessToken) {
          // Create the refresh token
          jwt.sign(
            {
              username: user.username,
              user_id: user.id,
            },
            config.server.token.refreshSecret,
            {
              issuer: config.server.token.issuer,
              algorithm: "HS256",
            },
            async (error, refreshToken) => {
              if (error) {
                callback(error, null, null);
              } else if (refreshToken) {
                // Insert the refresh token into the database
                await executeQuery(
                  `INSERT INTO refresh_token (username, refresh_token) VALUES('${user.username}','${refreshToken}')`,
                );
                callback(null, accessToken, refreshToken);
              }
            },
          );
        }
      },
    );
  } catch (error) {
    console.error(`${error.message}, ${error}`);
    callback(error, null, null);
  }
};

export default signedJWT;
