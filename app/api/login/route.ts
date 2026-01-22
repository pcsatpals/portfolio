import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/user.model";

interface LoginRequestBody {
  email: string;
  password: string;
}

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email, password }: LoginRequestBody = await request.json();

    if (!email?.trim() || !password?.trim()) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const accessToken = jwt.sign(
      { sub: user._id.toString() },
      getEnv("ACCESS_SECRET_TOKEN"),
      {
        expiresIn: getEnv("ACCESS_SECRET_EXPIRY") as jwt.SignOptions["expiresIn"],
      }
    );

    const refreshToken = jwt.sign(
      { sub: user._id.toString() },
      getEnv("REFRESH_SECRET_TOKEN"),
      {
        expiresIn: getEnv("REFRESH_SECRET_EXPIRY") as jwt.SignOptions["expiresIn"],
      }
    );


    return NextResponse.json(
      {
        user: {
          id: user._id.toString(),
          email: user.email,
          userName: user.userName,
        },
        accessToken,
        refreshToken,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("USER_LOGIN_ERROR:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
