import { connectMongoDB } from "@/app/lib/dbConnection";
import { User } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "../models/UserModel";

export  async function POST(req: NextRequest) {
    try {
        const { userId } = await req.json();

        await connectMongoDB();

        const user = await UserModel.findOne({ userId });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
