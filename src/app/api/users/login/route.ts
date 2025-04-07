import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(request: NextRequest) {

    // Connect to the database
    await connect()

    const body = await request.json()
    const { email, password } = body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        const isValidPassword = await bcryptjs.compare(password, user.password)

        if (!isValidPassword) {
            return NextResponse.json({ message: "Invalid Password" }, { status: 400 })
        }

        // Generate JWT token
        const token = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // Sign the token with a secret key and set expiration time
        const jwtToken = jwt.sign(token, process.env.JWT_SECRET as string, {
            expiresIn: "1d"
        })

        const response = NextResponse.json({ message: "user Login successfully" }, { status: 200 })

        // Set the token in the response cookies
        response.cookies.set("token", jwtToken, {
            httpOnly: true,

        })
        return response;


        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}