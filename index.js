import express from "express";
import dotenv from "dotenv";
import UserRoute from "./routes/userRoute.js";
import morgan from "morgan";
import cors from "cors";
import colors from "colors";
import { databaseConnection } from "./helpers/databaseConnection.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello From Server");
});

app.use("/v1/user", UserRoute);

app.listen(PORT, () => {
  databaseConnection().then(
    console.log(
      `Server running on ${PORT} and connected to Mongo`.bgMagenta.white
    )
  );
});
