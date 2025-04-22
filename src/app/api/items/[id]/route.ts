import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import mongoose from "mongoose";
import connectMongoDB from "../../../../../config/mongodb";
import Item from "../../../../models/itemSchema";

// ✅ PUT - Update item
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const params = await context.params;
  const { id } = params;

  const formInfo = await request.formData();

  const title = formInfo.get("title") as string;
  const description = formInfo.get("description") as string;
  const status = formInfo.get("status") as string;
  const location = formInfo.get("location") as string;
  const tags = formInfo.get("tags")
    ? JSON.parse(formInfo.get("tags") as string)
    : [];
  const image = formInfo.get("image") as File | null;

  let imageUrl = "";

  if (image && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = `${Date.now()}-${image.name.replace(/\s+/g, "_")}`;
    const uploadFolder = "public/uploads";
    const filePath = `${uploadFolder}/${filename}`;

    await writeFile(filePath, buffer);
    imageUrl = `/uploads/${filename}`;
  }

  const updateData: any = {
    title,
    description,
    status,
    location,
    tags,
  };

  if (imageUrl) {
    updateData.imageUrl = imageUrl;
  }

  await connectMongoDB();
  await Item.findByIdAndUpdate(id, updateData);

  return NextResponse.json({ message: "Item updated" }, { status: 200 });
}

// ✅ GET - Single item
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const params = await context.params;
  const { id } = params;

  await connectMongoDB();
  const item = await Item.findOne({ _id: id });
  return NextResponse.json({ item }, { status: 200 });
}

// ✅ DELETE - Single item
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const params = await context.params;
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
  }

  await connectMongoDB();
  const deletedItem = await Item.findByIdAndDelete(id);

  if (!deletedItem) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}
