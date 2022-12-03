import express from "express";
import cors from "cors";
import startDB from "./startup/db";
import "dotenv/config";
import morgan from "morgan";

(async () => await startDB())();
const app = express();
app.use(express.json());
app.use(cors());

// generate custom token
morgan.token("host", function (req: any) {
  return req.hostname;
});

// setup the logger
app.use(
  morgan(":method :host :url :status :res[content-length] - :response-time ms")
);

if (!process.env.JWT_PRIVATE_KEY) {
  console.error("FATAL ERROR: JWT_PRIVATE_KEY is not defined.");
  process.exit(1);
}

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});

export default server;

