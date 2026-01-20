import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await connectDB()
        const data = await request.json();
        const { email, userName, password } = data;
        const isBodyValidate = [email, userName, password].every(
            (field) => field && field.trim() != ""
        );

        if (!isBodyValidate) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 409 }
            );
        }

        const existedUser = await User.findOne({ email });

        if (existedUser) {
            return NextResponse.json(
                { message: "User with email or username already exists" },
                { status: 409 }
            );
        }

        const user = new User({
            email,
            userName,
            password,
        });


        // Use .save() with the validation flag
        await user.save();

        return NextResponse.json(
            {
                message: "User created successfully",
                user: {
                    id: user._id,
                    email: user.email,
                    userName: user.userName,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("USER_CREATE_ERROR:", error);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}


export async function GET() {
    console.log("request.body")
    const mongoose = await connectDB();
    console.log("Connected DB:", mongoose.connection.name); // should log "test"

    return NextResponse.json({
        label: "test"
    })
}
