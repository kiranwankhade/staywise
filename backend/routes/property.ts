import express from "express";
import Property from "../models/Property";
import { verifyToken } from "../middleware/auth";

const propertyRouter = express.Router();

propertyRouter.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

propertyRouter.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

propertyRouter.post("/", verifyToken, async (req, res) => {
  const user = (req as any).user;
  if (user.role !== "admin") return res.status(403).json({ error: "Admin only" });

  const {
    title,
    description,
    imageUrl,
    location,
    guests,
    bedrooms,
    bathrooms,
    perNightPrice,
    amenities,
  } = req.body;

  try {
    const property = new Property({
      title,
      description,
      imageUrl,
      location,
      guests,
      bedrooms,
      bathrooms,
      perNightPrice,
      amenities,
    });
    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default propertyRouter;
