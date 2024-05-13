/**
 * @license apache-2.0/mit
 * @copyright vladiere
 * */

'use strict';

const generateRandomString = (length) => {
  let text = '';
  let possible = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789';

  for (let index = 0; index < length; index++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

export { generateRandomString };
