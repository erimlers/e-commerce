import { config as loadDotenv } from "dotenv";
import { loadEnv } from "./config/env.js";
import { connectDb } from "./config/db.js";
import { createApp } from "./app.js";

loadDotenv();

const env = loadEnv();
const app = createApp();

await connectDb(env.mongoUri);
app.listen(env.port, () => {
  console.log(`CALDER API ${env.port} portunda`);
});
