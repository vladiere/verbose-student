/**
 *@license Apache-2.0/MIT
 *@copyright vladiere
 */

'use-strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { app, server } from './src/socket/socket.js';

const PORT = process.env.PORT || 4545;
// const corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200,
// }


import authRoute from'./src/routes/auth.route.js';
import spotifyRoute from'./src/routes/spotify.route.js';

app.use(cors()).use(helmet()).use(morgan('dev')).use(bodyParser.json()).use(cookieParser());

app.use('/api', authRoute);
app.use('/api/spotify', spotifyRoute);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  return res.status(404).json({
    message: error.message,
  });
});

server.listen(PORT, () => {
  console.info(`Server listening on http://localhost:${PORT}`);
})
