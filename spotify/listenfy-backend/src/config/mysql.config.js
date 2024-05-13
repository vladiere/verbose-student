/**
 * @license Apache-2.0/MIT
 * @copyright vladiere
 * */

'use strict';

import mysql from 'mysql2';
import config from './app.config.js';

// Parameters for mysql connection
const params = {
  user: config.mysql.user,
  password: config.mysql.pass,
  host: config.mysql.host,
  database: config.mysql.database,
};

// Setting up the database connection
const Connect = () =>
  new Promise((resolve, reject) => {
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
const Query = (
  connection,
  query,
  params,
) => new Promise((resolve, reject) => {
  connection.query(query, params, (error, result) => {
    if (error) {
      reject(error);
      return;
    }

    resolve(result);

    connection.end();
  });
});

export { Connect, Query };
