import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
  { timestamps: true }
);

// HASH password BEFORE saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is new/modified

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
