import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Get all items
export async function GET() {
    await connectMongoDB();
    const items = await Item.find();
    return NextResponse.json({ items }, { status: 200 });
}

// Add a new item
export async function POST(request: NextRequest) {
    const { title, description, url } = await request.json();
    await connectMongoDB();
    const newItem = await Item.create({ title, description, url });
    return NextResponse.json({ message: "Item created", item: newItem }, { status: 201 });
}