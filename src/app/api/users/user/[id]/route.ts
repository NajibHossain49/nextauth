// app/api/users/user/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        // Verify user is authenticated (optional, remove if you want public access)
        const userId = await getDataFromToken(request);

        // Get user by ID from params
        const user = await User.findOne({ _id: params.id }).select("-password");

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}