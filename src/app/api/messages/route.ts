import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import Message from "../../../models/messageSchema";

// POST - Create a new message between users about a specific item
export async function POST(request: NextRequest) {
  // Parse JSON body from the request
  const body = await request.json();

  const { itemId, senderEmail, recipientEmail, messageText } = body;

  // Validate required fields are present
  if (!itemId || !senderEmail || !recipientEmail || !messageText) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Connect to MongoDB
  await connectMongoDB();

  // Create and save the message in the database
  const newMessage = await Message.create({
    itemId,
    senderEmail,
    recipientEmail,
    messageText,
  });

  // Return the created message with a 201 status
  return NextResponse.json(newMessage, { status: 201 });
}
