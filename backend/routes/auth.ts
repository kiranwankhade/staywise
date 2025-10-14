import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const authRouter = express.Router();

// ✅ SIGNUP
authRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password , role } = req.body;

    // Check duplicate
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ error: "Email already registered" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ 
      name, 
      email, 
      password: hashed, 
      role: role === "admin" ? "admin" : "user" 
    });
    
    await user.save();

    res.json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ LOGIN
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email" });
    console.log('user:', user)

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Wrong password" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
  };

  res.json({ token, user: userData });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


export default authRouter;