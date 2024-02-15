import express from "express";
import {
  create,
  read,
  update,
  remove,
  readbyemail,
  clearCache
} from "../controllers/userController.js";

import { cache } from "../middlewares/cache.js";

const UserRoute = express.Router();

UserRoute.post("/create", create);
UserRoute.get("/read", read);
UserRoute.get("/readbyemail/:email",cache, readbyemail);
UserRoute.put("/update/:id", update);
UserRoute.delete("/remove/:id", remove);
UserRoute.get("/clearcache", clearCache)

export default UserRoute;
