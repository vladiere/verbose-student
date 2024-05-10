import mysql from "mysql2";
import config from "./config";

// Parameters for mysql connection
const params = {
  user: config.mysql.user,
  password: config.mysql.pass,
  host: config.mysql.host,
  database: config.mysql.database,
};

// Setting up the database connection
const Connect = async () =>
  new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection(config.mysqlurl);

    connection.connect((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(connection);
    });
  });

// Setting up for query
const Query = async <T>(
  connection: mysql.Connection,
  query: string,
  params?: any[],
) => new Promise<T>((resolve, reject) => {
  connection.query(query, params, (error, result: any) => {
    if (error) {
      reject(error);
      return;
    }

    resolve(result);

    connection.end();
  });
});

export { Connect, Query };
