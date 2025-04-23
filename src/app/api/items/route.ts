import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import connectMongoDB from "../../../../config/mongodb";
import Item from "../../../models/itemSchema";

// POST - Handle new item creation
export async function POST(request: NextRequest) {
  // Parse form data from the incoming request
  const formInfo = await request.formData();
  const title = formInfo.get("title") as string;
  const description = formInfo.get("description") as string;
  const tags = JSON.parse(formInfo.get("tags") as string);
  const location = formInfo.get("location") as string;
  const image = formInfo.get("image") as File;

  const username = formInfo.get("username") as string;
  const email = formInfo.get("email") as string;

  // Validate that user info is present
  // Check for userId too
  if (!username || !email) {
    return NextResponse.json({ message: "Missing user info" }, { status: 400 });
  }

  await connectMongoDB();

  let imageUrl = "";

  // Handle image upload if provided
  if (image) {
    const buff = Buffer.from(await image.arrayBuffer());
    const filename = `${Date.now()}-${image.name}`;
    const filepath = path.join(process.cwd(), "public/uploads", filename);
    await writeFile(filepath, buff);
    imageUrl = `/uploads/${filename}`;
  }

  // Save the item to the database
  // Save userId under 'owner'
  await Item.create({
    title,
    description,
    tags,
    location,
    imageUrl,
    username,
    email,
  });

  return NextResponse.json({ message: "Item added!" }, { status: 201 });
}

// GET - Fetch all items with optional sorting
export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

    // Read sorting criteria from query params
    // Sorting logic
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get("sortBy") || "newest";

    let sortOptions = {};

    // Determine sorting strategy
    switch (sortBy) {
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "recently-updated":
        sortOptions = { updatedAt: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    // Retrieve sorted items from database
    const items = await Item.find().sort(sortOptions);

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { message: "Failed to fetch items" },
      { status: 500 }
    );
  }
}
