import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const data = await request.json();
    
    const appointmentsCollection = await dbConnect("appointments");
    const result = await appointmentsCollection.insertOne(data);
    
    return NextResponse.json({ message: "Success", result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error saving data" }, { status: 500 });
  }
};