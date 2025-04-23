import mongoose, { Schema, Document } from "mongoose";

// Define TypeScript interface for a message document
interface IMessage extends Document {
  itemId: string; // ID of the item the message is about
  senderEmail: string; // Email of the person sending the message
  recipientEmail: string; // Email of the item owner or recipient
  messageText: string; // The actual message content
  createdAt: Date; // Automatically added by timestamps
}

// Define the Mongoose schema for messages
const messageSchema = new Schema<IMessage>(
  {
    itemId: { type: String, required: true },
    senderEmail: { type: String, required: true },
    recipientEmail: { type: String, required: true },
    messageText: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Export the model, reusing the existing one if it already exists
const Message =
  mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export default Message;
