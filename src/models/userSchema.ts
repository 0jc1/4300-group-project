import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username."],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email."],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: 6,
    },
  },
  { timestamps: true } // Automatically includes createdAt and updatedAt fields
);

// Middleware to hash the password before saving the user document
userSchema.pre("save", async function (next) {
  // Only hash if the password field is modified
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Use existing model if already compiled by Mongoose, otherwise compile a new one
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
