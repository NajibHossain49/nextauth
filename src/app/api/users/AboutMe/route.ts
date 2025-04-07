import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

// Connect to the database
connect();

export async function POST(request: NextRequest) {

    try {
        // Get the user ID from the token
        const userId = await getDataFromToken(request);
        if (!userId) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        // Find the user in the database
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

}