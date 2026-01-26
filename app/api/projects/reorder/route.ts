import { NextRequest, NextResponse } from "next/server";
import { Project } from "@/models/project.model";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";

export async function PUT(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();

        const items: { id: string; position: number }[] = body.order;

        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { message: "Invalid reorder payload" },
                { status: 400 }
            );
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            for (const item of items) {
                await Project.updateOne(
                    { _id: item.id },
                    { $set: { position: item.position } },
                    { session }
                );
            }

            await session.commitTransaction();
            session.endSession();

            return NextResponse.json(
                { message: "Projects reordered successfully" },
                { status: 200 }
            );
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            throw err;
        }
    } catch (err) {
        console.error("REORDER ERROR:", err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
