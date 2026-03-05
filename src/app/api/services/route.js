import dbConnect, { collectionsName } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const servicesCollection = await dbConnect(collectionsName.servicesCollection);
    const totalItems = await servicesCollection.countDocuments();
    const data = await servicesCollection
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      data,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page
    });
  } catch (error) {
    return NextResponse.json({ message: "Failed to load" }, { status: 500 });
  }
};



export const POST = async (request) => {
  const data = await request.json();
  const servicesCollection = await dbConnect("services");
  const result = await servicesCollection.insertOne(data);
  return NextResponse.json({ message: "Service added", result });
};