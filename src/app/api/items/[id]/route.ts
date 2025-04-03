import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/itemSchema";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Get a specific item by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectMongoDB();
    const item = await Item.findById(id);
    if (!item) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ item }, { status: 200 });
}

// Update an item
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const { title, description, url } = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectMongoDB();
    const updatedItem = await Item.findByIdAndUpdate(id, { title, description, url }, { new: true });

    if (!updatedItem) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Item updated", item: updatedItem }, { status: 200 });
}

// Delete an item
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectMongoDB();
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}