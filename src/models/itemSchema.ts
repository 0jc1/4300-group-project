import mongoose, { Schema, Document, Model } from "mongoose";

// Define the TypeScript interface for an item document
interface IItem extends Document {
  title: string;
  description?: string;
  tags?: string[];
  location?: string;
  imageUrl?: string;
  username?: string;
  email?: string;
  owner: string; // User ID or identifier for the item's owner
  status?: "lost" | "returned";
}

// Define the Mongoose schema for the Item model
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
    owner: {
      // Optional owner field for associating item with a user
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["lost", "returned"],
      default: "lost",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Use existing model if available, otherwise create a new one
const Item: Model<IItem> =
  mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);

export default Item;
