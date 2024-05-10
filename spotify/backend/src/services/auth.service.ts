import bcryptjs from "bcryptjs";
import signedJWT from "../utils/signedJWT";
import { Connect, Query } from "../config/mysql";
import { IMySQLResult, IUser } from "../models/result.model";
import { executeQuery } from "../utils/executeQuery";
import { UserForLogin, UserForCreate, User, UserForUpdate } from "../models/auth.model";

const register = async (
  user: UserForCreate
): Promise<User | any> => {
  try {
    const hash = await bcryptjs.hash(user.password, 10);

    // Insert data to the database
    let query = "INSERT INTO user_details (fullname, username, password) VALUES (?,?,?);";

    const connection = await Connect();
    const result: any = await Query<IMySQLResult>(connection, query, [
      user.fullname,
      user.username,
      hash
    ]);

    return result.insertId;
  } catch (error: any) {
    console.error(`Registration Error: ${error.message}`);
    return {
      message: error.message,
      error,
      status: 500,
    };
  }
};

const login = async (
  login: UserForLogin
): Promise<string | any> => {
  let query = "SELECT id, username, password, ctime, mtime FROM user_details WHERE username = ?";

  try {
    const connection = await Connect();
    const user: any = await Query<IUser>(connection, query, [login.username]);

    console.log(user)
    connection.end();

    const result = await new Promise((resolve, reject) => {
      bcryptjs.compare(login.password, user[0].password, (error, result) => {
        if (error) {
          console.error(`bcryptjs error: ${error}`);
          // Reject the Promise with an error object
          reject({
            message: "Something is wrong or either account not exists",
            error,
            status: 500,
          });
        } else if (result) {
          signedJWT(user[0], (_error, accessToken, refreshToken) => {
            if (_error) {
              // Reject the Promise with an error object
              reject({
                message: "Unable to SIGN Token",
                error: _error,
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
  } catch (error: any) {
    console.error(`Connection Error: ${error}`);
    // Reject the Promise with an error object
    throw {
      message: 'Something is wrong try again.',
      error,
      status: 500,
    };
  }
};

const logout = async (refresh_token: string) => {
  try {
    const query = "DELETE FROM refresh_token WHERE refresh_token = ?";

    const result: any = await executeQuery(query, [refresh_token]);

    if (result.affectedRows === 1) {
      return { message: "Logout Successfully" };
    } else {
      return result;
    }
  } catch (error: any) {
    console.error(`Logging out Librarian Error: ${error}`);
    throw new Error(error);
  }
};

const changeUserPassword = async (user: UserForUpdate) => {
  try {
    const query = "UPDATE user_details SET password = ? WHERE id = ?;";
    const hash = await bcryptjs.hash(user.password, 10);
    const result: any = await executeQuery(query, [hash, user.id]);

    return result[0][0];
  } catch (error: any) {
    console.error(`Changing password on service error: ${error}`);
    return error;
  }
};

const getUserById = async (id: number) => {
  try {
    const query = "SELECT id, fullname, username, ctime, mtime FROM user_details WHERE id = ?";

    const result: any = await executeQuery(query, [id]);

    return result[0];
  } catch (error) {
    console.error(`Getting user by id error: ${error}`);
    return error;
  }
}

export default {
  register,
  login,
  logout,
  changeUserPassword,
  getUserById,
};
