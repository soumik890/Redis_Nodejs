import dotenv from "dotenv";
import { client } from "../helpers/redisConfig.js";

dotenv.config();

export const cache = async (req, res, next) => {
  const cache = req.params[process.env.CACHE_NAME];

  const cachedResult = await client.get(cache);

  if (cachedResult !== null) {
    console.log(`Data catched ${cache}`);
    res.send(JSON.parse(cachedResult));
  } else {
    console.log(`Data not catched ${cache}`);
    next();
  }
};
