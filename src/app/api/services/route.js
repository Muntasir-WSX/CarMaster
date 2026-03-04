import dbConnect, { collectionsName } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const servicesCollection = await dbConnect(collectionsName.servicesCollection);
        const result = await servicesCollection.find().toArray();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ message: "Failed to load" }, { status: 500 });
    }
};