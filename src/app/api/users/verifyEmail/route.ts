import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    // Connect to the database
    await connect();

    // Parse the request body
    const { token } = await request.json();
    console.log("Received token:", token);

    try {
        // Find the user with the exact hashed token
        const user = await User.findOne({
            "verification.token": token,
            "verification.expiry": { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
        }

        // Update user verification status
        user.isVerified = true;
        user.verification.token = "";
        user.verification.expiry = null;

        // Save the user to the database
        await user.save();

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });

    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}