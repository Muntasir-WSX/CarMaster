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



export const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    try {
        const appointmentsCollection = await dbConnect("appointments");
        const result = await appointmentsCollection.find({ email: email }).toArray();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
};