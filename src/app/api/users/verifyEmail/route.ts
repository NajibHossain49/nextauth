import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    // Connect to the database
    await connect();

    // Parse the request body
    const { email, token } = await request.json();
    console.log(token, email);

    try {
        const user = await User.findOne({
            "verification.token": token,
            "verification.expiry": { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        else if (user.verification.expiry < new Date()) {
            return NextResponse.json({ message: "Token expired" }, { status: 400 });
        }

        const isMatch = await bcryptjs.compare(token, user.verification.token);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid token" }, { status: 400 });
        }

        user.isVerified = true;
        user.verification.token = "";
        user.verification.expiry = null;

        // Save the user to the database
        await user.save();

        await sendEmail(email, "Email verification", "Your email has been verified successfully");

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });

    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

