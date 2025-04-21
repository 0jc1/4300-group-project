import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import connectMongoDB from "../../../../config/mongodb";
import Item from "../../../models/itemSchema";
import { IItem } from "@/types";

//Create a async post function to handle posting of items added.
export async function POST(request: NextRequest) {
  //Collect all fields from the input fields of the form.
  const formInfo = await request.formData();
  const title = formInfo.get("title") as string;
  const description = formInfo.get("description") as string;
  const tags = JSON.parse(formInfo.get("tags") as string);
  const location = formInfo.get("location") as string;
  const image = formInfo.get("image") as File;

  //Wait to connect to the MongoDatabase.
  await connectMongoDB();

  //Empty string to hold the URl of the image.
  let imageUrl = "";

  //Save the image if a file has been inputted.
  if (image) {
    const buff = Buffer.from(await image.arrayBuffer());
    const filename = `${Date.now()}-${image.name}`;
    const filepath = path.join(process.cwd(), "public/uploads", filename);
    await writeFile(filepath, buff);
    imageUrl = `/uploads/${filename}`;
  }

  //Now add the new item to the database from the collected form information.
  await Item.create({
    title,
    description,
    tags,
    location,
    imageUrl,
  });

  //If successful, display item added.
  return NextResponse.json({ message: "Item added!" }, { status: 201 });
}

// GET all items
export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get('sortBy') || 'newest';
    
    let sortOptions = {};
    
    switch (sortBy) {
      case 'oldest':
        sortOptions = { createdAt: 1 };
        break;
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      case 'recently-updated':
        sortOptions = { updatedAt: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 }; 
    }
    
    const items = await Item.find().sort(sortOptions);

    console.log(items)

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { message: "Failed to fetch items" },
      { status: 500 }
    );
  }
}
