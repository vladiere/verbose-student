/**
 * @license apache-2.0/mit
 * @copyright vladiere
 * */

'use strict';

import bcryptjs from "bcryptjs";
import signedJWT from "../utils/signedJWT.util.js";
import { Connect, Query } from "../config/mysql.config.js";
import { executeQuery } from "../utils/executeQuery.util.js";

const register = async (fullname, username, password) => {
  try {
    const hash = await bcryptjs.hash(password, 10);

    // Insert data to the database
    let query = "INSERT INTO user_details (fullname, username, password) VALUES (?,?,?);";

    const connection = await Connect();
    const result = await Query(connection, query, [
      fullname,
      username,
      hash
    ]);

    return result.insertId;
  } catch (error) {
    console.error(`Registration Error: ${error.message}`);
    return {
      message: error.message,
      error,
      status: 500,
    };
  }
};

const login = async (username, password) => {
  let query = "SELECT id, username, password, ctime, mtime FROM user_details WHERE username = ?";

  try {
    const connection = await Connect();
    const user = await Query(connection, query, [username]);

    connection.end();

    const result = await new Promise((resolve, reject) => {
      bcryptjs.compare(password, user[0].password, (error, result) => {
        if (error) {
          console.error(`bcryptjs error: ${error}`);
          // Reject the Promise with an error object
          reject({
            message: "Something is wrong or either account not exists",
            error,
            status: 500,
          });
        } else if (result) {
          signedJWT(user[0], (error, accessToken, refreshToken) => {
            if (error) {
              // Reject the Promise with an error object
              reject({
                message: "Unable to SIGN Token",
                error,
                status: 401,
              });
            } else if (accessToken && refreshToken) {
              // Resolve the Promise with the desired value
              resolve({
                id: user[0].id,
                accessToken,
                refreshToken,
              });
            }
          });
        } else {
          // Reject the Promise with an error object
          reject({
            message: "Login failed wrong password",
            status: 404,
          });
        }
      });
    });

    return result; // Resolve the Promise with the result
  } catch (error) {
    console.error(`Connection Error: ${error}`);
    // Reject the Promise with an error object
    throw {
      message: 'Something is wrong try again.',
      error,
      status: 500,
    };
  }
};

const logout = async (refresh_token) => {
  try {
    const query = "DELETE FROM refresh_token WHERE refresh_token = ?";

    const result = await executeQuery(query, [refresh_token]);

    if (result.affectedRows === 1) {
      return { message: "Logout Successfully" };
    } else {
      return result;
    }
  } catch (error) {
    console.error(`Logging out Librarian Error: ${error}`);
    throw new Error(error);
  }
};

const changeUserPassword = async (id, password) => {
  try {
    const query = "UPDATE user_details SET password = ? WHERE id = ?;";
    const hash = await bcryptjs.hash(password, 10);
    const result = await executeQuery(query, [hash, id]);

    return result[0][0];
  } catch (error) {
    console.error(`Changing password on service error: ${error}`);
    return error;
  }
};

const getUserById = async (id) => {
  try {
    const query = "SELECT id, fullname, username, ctime, mtime FROM user_details WHERE id = ?";

    const result = await executeQuery(query, [id]);

    return result[0];
  } catch (error) {
    console.error(`Getting user by id error: ${error}`);
    return error;
  }
};

export default {
  register,
  login,
  logout,
  changeUserPassword,
  getUserById,
};

