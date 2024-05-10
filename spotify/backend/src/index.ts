import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import indexRoute from "./routes/index";

import authRoute from "./routes/auth.routes";

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3000;

const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/api', indexRoute);
app.use('/api', authRoute);

app.use((req, res, next) => {
  const error = new Error("Not found");
  return res.status(404).json({
    message: error.message
  });
});

app.listen(PORT, () => {
  console.info(`\n\nServer is listening on http://localhost:${PORT}`)
})

export default app;
