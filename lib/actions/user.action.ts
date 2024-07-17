"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

export async function fetchDbBlogs() {
  try {
    connectToDatabase();

    const user = await User.find({});

    return { user };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch blogs");
  }
}
