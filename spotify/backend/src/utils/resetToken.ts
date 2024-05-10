import { executeQuery } from "./executeQuery";
import config from "../config/config";
import jwt from "jsonwebtoken";

const resetToken = (
    username: string,
    callback: (error: Error | null, reset_token: string | null | undefined) => void,
): void => {
  consol.info(`Attempting to sign for reset token to ${email}`);

  try {
    jwt.sign(
      { username },
      config.server.token.resetAccessSecret,
      {
        issuer: config.server.token.issuer,
        algorithm: "HS256",
        expiresIn: config.server.token.resetTokenExpireTime,
      },
      (error, reset_token) => {
        if (error) {
          callback(error, null);
        }
        callback(null, reset_token);
      }
    );
  } catch (error: any) {
    logger.error('Signing token error at rest token: ');
    console.error(error);
    callback(error, null);
  }
}

export default resetToken;
