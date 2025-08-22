import express from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/authModels";
import { AuthenticatedRequest, authMiddleware } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/checkRole";

const router = express.Router();

// ---------- Zod Schemas ----------
const registerSchema = z.object({
  username: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  username: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ---------- REGISTER ----------
router.post("/register", async (req, res) => {
  try {
    const { username, password } = registerSchema.parse(req.body);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

  res.status(201).json({ message: "User registered successfully"});
  } catch (err) {
    if (err) {
      return res.status(401).json({ message: "username should be in email and password should be atleas 6 charectors" });
    }
    return res.status(500).json({ message: "Server error" });
  }
});

// ---------- LOGIN ----------
router.post("/login", async (req, res) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "4h" }
  );

    res.json({ token });
  } catch (err) {
    if (err) {
      return res.status(400).json({ message: "username should be in email and password should be atleas 6 charectors" });
    }
    return res.status(500).json({ message: "Server error" });
  }
});

// ---------- GET CURRENT USER ----------
router.get("/me", authMiddleware, (req : AuthenticatedRequest, res) => {

  res.json({
    id: req.user?.id,
    username: req.user?.username,
    role: req.user?.role
  });
});


// Example admin-only route
router.get("/admin-data", authMiddleware, checkRole("admin"), (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});



export default router;
