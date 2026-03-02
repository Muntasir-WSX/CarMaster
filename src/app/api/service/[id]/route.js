import dbConnect, { collectionsName } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req,{params}) => {
const { id } = await params;
  const servicesCollection = await dbConnect(collectionsName.servicesCollection);
  const data = await servicesCollection.findOne({ _id: new ObjectId(id) });

  return NextResponse.json(data);

}