
import mongoose, { Schema, Document, Model } from "mongoose";

interface IItem extends Document {
  title: string;
  description?: string;
  tags?: string[];
  location?: string;
  imageUrl?: string;
  username?: string;
  email?: string;
  status?: "lost" | "returned"; // ✅ Added this
}

const itemSchema = new Schema<IItem>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    status: {
      type: String,
      enum: ["lost", "returned"], // ✅ Either "lost" or "returned"
      default: "lost", // ✅ Default if nothing passed
    },
  },
  { timestamps: true }
);

const Item: Model<IItem> =
  mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);


export default Item;
