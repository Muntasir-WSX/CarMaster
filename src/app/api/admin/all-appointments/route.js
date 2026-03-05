import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const appointmentsCollection = await dbConnect("appointments");
    const totalItems = await appointmentsCollection.countDocuments();

    const data = await appointmentsCollection
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ requestedAt: -1 }) 
      .toArray();

    return NextResponse.json({
      data,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page
    });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};

export const PATCH = async (request) => {
  try {
    const { id, status } = await request.json();
    const appointmentsCollection = await dbConnect("appointments");
    
    const result = await appointmentsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );

    return NextResponse.json({ message: "Status updated", result });
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
};