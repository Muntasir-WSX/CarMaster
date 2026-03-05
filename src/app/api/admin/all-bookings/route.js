import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const bookingsCollection = await dbConnect("bookings");
    const totalItems = await bookingsCollection.countDocuments();

    const data = await bookingsCollection
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 })
      .toArray();

    return NextResponse.json({ data, totalItems, totalPages: Math.ceil(totalItems / limit) });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
};


export const PATCH = async (request) => {
  try {
    const { id, status } = await request.json();
    const bookingsCollection = await dbConnect("bookings");
    const result = await bookingsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );
    return NextResponse.json({ message: "Updated", result });
  } catch (error) {
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
};

export const DELETE = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id"); 
    const bookingsCollection = await dbConnect("bookings");
    
    const result = await bookingsCollection.deleteOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({ message: "Deleted successfully", result });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
};