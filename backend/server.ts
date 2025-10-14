import { Response } from "express";

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

import authRouter from "./routes/auth";
import bookingRouter from "./routes/booking";
import propertyRouter from "./routes/property";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err:any) => console.error(err));

app.get("/", (req:Request, res:Response) => {
  res.send("StayWise API running");
});

app.use("/api/auth", authRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/properties", propertyRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(` Server running on port ${process.env.PORT || 5000}`);
});
