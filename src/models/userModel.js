import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPassword: {
      token: String,
      expiry: Date,
    },
    verification: {
      token: String,
      expiry: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Reuse model if it already exists (important for hot reloads/serverless environments)
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
