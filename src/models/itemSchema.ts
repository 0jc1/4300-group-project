import mongoose, { Schema, Document, Model } from "mongoose";


interface IItem extends Document {
  owner?: number;
  title: string;
  description?: string;
  tags?: string[];
  location?: string;
  imageUrl?: string;
}

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
});

const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);
export default Item;
