import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../config/mongodb";
import Item from "../../../models/itemSchema";

// GET - Fetch lost and returned items for a specific user by email
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("userEmail"); // Use userEmail from query params

  await connectMongoDB();

  // Ensure userEmail is provided
  if (!userEmail) {
    return NextResponse.json({ error: "Missing userEmail" }, { status: 400 });
  }

  // Query the database for lost and returned items belonging to the user
  const lostItems = await Item.find({ email: userEmail, status: "lost" });
  const returnedItems = await Item.find({
    email: userEmail,
    status: "returned",
  });

  // Respond with both lists grouped in a single object
  return NextResponse.json({ lostItems, returnedItems });
}
