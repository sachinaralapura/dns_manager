import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { DATABASE_URL } from "./config.js";
import usersRoute from "./routes/usersRoute.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/dnsmanager", usersRoute);
mongoose.connect(DATABASE_URL);

app.listen(3001, () => {
  console.log("server is listening");
});
