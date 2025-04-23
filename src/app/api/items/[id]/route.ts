import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import mongoose from "mongoose";
import connectMongoDB from "../../../../../config/mongodb";
import Item from "../../../../models/itemSchema";

// PUT - Update item by ID
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  // Extract item ID from route parameters
  const params = await context.params;
  const { id } = params;

  // Retrieve form data from the request
  const formInfo = await request.formData();

  // Extract individual form fields
  const title = formInfo.get("title") as string;
  const description = formInfo.get("description") as string;
  const status = formInfo.get("status") as string;
  const location = formInfo.get("location") as string;
  const tags = formInfo.get("tags")
    ? JSON.parse(formInfo.get("tags") as string)
    : [];
  const image = formInfo.get("image") as File | null;

  let imageUrl = "";

  // If an image was uploaded, save it to the server and generate a URL
  if (image && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = `${Date.now()}-${image.name.replace(/\s+/g, "_")}`;
    const uploadFolder = "public/uploads";
    const filePath = `${uploadFolder}/${filename}`;

    await writeFile(filePath, buffer);
    imageUrl = `/uploads/${filename}`;
  }

  // Create object containing updated fields
  const updateData: any = {
    title,
    description,
    status,
    location,
    tags,
  };

  // Add image URL only if a new image was uploaded
  if (imageUrl) {
    updateData.imageUrl = imageUrl;
  }

  // Connect to MongoDB and update the item
  await connectMongoDB();
  await Item.findByIdAndUpdate(id, updateData);

  // Respond with success message
  return NextResponse.json({ message: "Item updated" }, { status: 200 });
}

// GET - Retrieve a single item by ID
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  // Extract item ID from route parameters
  const params = await context.params;
  const { id } = params;

  // Connect to MongoDB and find the item
  await connectMongoDB();
  const item = await Item.findOne({ _id: id });

  // Return the item in the response
  return NextResponse.json({ item }, { status: 200 });
}

// DELETE - Remove a single item by ID
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  // Extract item ID from route parameters
  const params = await context.params;
  const { id } = params;

  // Validate the format of the MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  // Connect to MongoDB and attempt to delete the item
  await connectMongoDB();
  const deletedItem = await Item.findByIdAndDelete(id);

  // Handle case where item was not found
  if (!deletedItem) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  // Respond with success message
  return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}
