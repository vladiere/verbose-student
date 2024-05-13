/**
 * @license apache-2.0/mit
 * @copyright vladiere
 * */

'use strict';

import { Connect, Query } from "../config/mysql.config.js";

const executeQuery = async (query, params = []) => {
  try {
    const connection = await Connect();
    const result = await Query(connection, query, params);

    connection.end();

    return result;
  } catch (error) {
    console.error(`Database query error: ${error.message}, ${error}`);
    throw error;
  }
};

export { executeQuery };
