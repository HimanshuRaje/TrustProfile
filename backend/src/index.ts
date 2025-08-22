import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import submissionRoutes from "./routes/submission";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to TrustProfile API");
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Submission Route
app.use("/api", submissionRoutes);

// Server Listen
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
