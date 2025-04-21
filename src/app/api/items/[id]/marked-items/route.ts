// src/app/api/items/[id]/mark-returned/route.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import mongoose from "mongoose"
import connectMongoDB from "../../../../../../config/mongodb"
import Item from "../../../../../../models/itemSchema"

//An interface to define the shape of the parameters.
interface Params { params: { id: string } }

//An Async PUT function to update the items mark.
export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid item ID" },
      { status: 400 }
    )
  }

  //Wait for the connection to MongoDB
  await connectMongoDB()
  //Update the item's status to returned.
  const updated = await Item.findByIdAndUpdate(
    id,
    { status: "returned" },
    { new: true }
  )

  //If there is not an update, return 404.
  if (!updated) {
    return NextResponse.json(
      { message: "Item not found" },
      { status: 404 }
    )
  }

  //Return the success code if Item has been marked as returned.
  return NextResponse.json(
    { message: "Item marked as returned", item: updated },
    { status: 200 }
  )
}
