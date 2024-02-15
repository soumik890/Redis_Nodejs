import redis from "redis";
import dotenv from "dotenv";

dotenv.config();

export const client = await redis
  .createClient({
    password: process.env.REDIS_PASS,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  })
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();
