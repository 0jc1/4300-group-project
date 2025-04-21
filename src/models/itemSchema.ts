import mongoose, { Schema, Document, Model } from "mongoose";


interface IItem extends Document {
  owner?: number;
  title: string;
  description?: string;
  tags?: string[];
  location?: string; //Show the location of the item lost.
  imageUrl?: string; //Show the imageURl of the item lost.
  status?: string; //Show the status of the item lost; lost? returned?
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
  status: { //Will need to be implemented later when we can finally edit items.
    type: String,
    enum: ["lost", "returned"],
    default: "lost",
  },
});

const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);
export default Item;
