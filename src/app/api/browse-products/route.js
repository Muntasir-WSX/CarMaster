import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const productsCollection = await dbConnect("products");
        const products = await productsCollection.find().toArray();
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
    }
};