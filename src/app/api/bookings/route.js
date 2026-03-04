import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// 1. getting all bookings by email
export const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email'); 

    if (!email) {
        return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    try {
        const bookingsCollection = await dbConnect("bookings");
        const result = await bookingsCollection.find({ email: email }).toArray();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
};

// 2. deleting a booking by ID
export const DELETE = async (request) => {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    try {
        const bookingsCollection = await dbConnect("bookings");
        const res = await bookingsCollection.deleteOne({ _id: new ObjectId(id) });
        
        if (res.deletedCount === 1) {
            return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
        }
        return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ message: "Error deleting" }, { status: 500 });
    }
};