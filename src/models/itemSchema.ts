import mongoose, { Schema, Model } from "mongoose";
import { IItem } from "@/types";

const itemSchema = new Schema<IItem>({
  owner: {
    type: Number,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tags: {
    type: [String], 
  },
  location: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
}, { timestamps: true });

const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);
export default Item;
