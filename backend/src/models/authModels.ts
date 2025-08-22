import mongoose, { Schema, Document } from "mongoose";

// 1️⃣ User Interface
export interface IUser extends Document {
  username: string; // email
  password: string;
  trustScore: number;
  role: "user" | "admin";
}

// 2️⃣ User Schema
const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  trustScore: { type: Number, default: 50 }, // Neutral trust score
  role: { type: String, enum: ["user", "admin"], default: "user" }, // New role field
});

export const User = mongoose.model<IUser>("User", UserSchema);

// 3️⃣ Log Interface
export interface ILog extends Document {
  userId: mongoose.Types.ObjectId;
  action: string;
  timestamp: Date;
}

// 4️⃣ Log Schema
const LogSchema: Schema<ILog> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Log = mongoose.model<ILog>("Log", LogSchema);
