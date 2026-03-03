import dbConnect, { collectionsName } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Get service details by ID
export const GET = async (req, { params }) => {
  const { id } = await params;
  try {
    const servicesCollection = await dbConnect(collectionsName.servicesCollection);
    const data = await servicesCollection.findOne({ _id: new ObjectId(id) });
    
    if (!data) {
      return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Invalid ID or Server Error" }, { status: 500 });
  }
};

// Handle booking submission
export const POST = async (request) => {
  try {
    const bookingData = await request.json();
    const bookingsCollection = await dbConnect("bookings"); 
    
    const result = await bookingsCollection.insertOne(bookingData);
    
    return NextResponse.json(
      { message: "Service booked successfully", result }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking POST error:", error);
    return NextResponse.json(
      { message: "Failed to book service" }, 
      { status: 500 }
    );
  }
};