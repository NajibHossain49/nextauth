import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


export async function POST(request: NextRequest) {
    // Connect to the database
    await connect();

    try {
        const body = await request.json()
        const { username, email, password } = body

        // Validate the request body

        //Check if the user already exists
        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        //Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        // Save the user to the database
        const savedUser = await newUser.save()

        if (!savedUser) {
            return NextResponse.json({ error: "User creation failed" }, { status: 500 })
        }


        // Send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })
        return NextResponse.json({ message: "User created successfully" }, { status: 201 })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({
            message: "User creation failed",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}