import mongoose, { Schema, Document } from "mongoose";

interface IItem extends Document {
    title: string;
    description: string;
    url: string;
}

const ItemSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        url: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);