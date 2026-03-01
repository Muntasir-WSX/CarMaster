"use server";
import dbConnect, { collectionsName } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const registerUser = async (payload) => {
  try {
    const usersCollection = await dbConnect(collectionsName.usersCollection);
    const user = await usersCollection.findOne({ email: payload.email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      
      const newUser = {
        name: payload.name,
        email: payload.email,
        password: hashedPassword,
        role: "user"
      };

      const result = await usersCollection.insertOne(newUser);
      if (result.acknowledged) {
        return { 
          success: true, 
          message: "User created successfully!",
          insertedId: result.insertedId.toString() 
        };
      }
    } else {
      return { success: false, message: "User already exists!" };
    }
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Internal server error" };
  }
};