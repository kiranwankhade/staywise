import express from "express";
import Booking from "../models/Booking";
import { verifyToken } from "../middleware/auth";

const bookingRouter = express.Router();

bookingRouter.post("/", verifyToken, async (req, res) => {
  const { propertyId, date } = req.body;
  const userId = (req as any).user.id;

  const booking = new Booking({ userId, propertyId, date });
  await booking.save();

  res.json(booking);
});

bookingRouter.get("/", verifyToken, async (req, res) => {
  const user = (req as any).user;

  const filter = user.role === "admin" ? {} : { userId: user.id };
  const bookings = await Booking.find(filter).populate("propertyId");
  res.json(bookings);
});

export default bookingRouter;
