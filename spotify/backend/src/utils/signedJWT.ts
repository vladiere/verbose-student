import jwt from "jsonwebtoken";
import config from "../config/config";
import { JWTDetails } from "../models/auth.model";
import { executeQuery } from "./executeQuery";

const signedJWT = (
  user: JWTDetails,
  callback: ( error: Error | null, accessToken: string | null, refreshToken: string | null,) => void,
): void => {
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
  } catch (error: any) {
    console.error(`${error.message}, ${error}`);
    callback(error, null, null);
  }
};

export default signedJWT;
